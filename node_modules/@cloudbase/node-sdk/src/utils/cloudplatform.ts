import { lookupAppId } from './metadata'
import { isNonEmptyString } from './utils'

enum CloudPlatform {
  Unknown = '',
  TencentCloud = 'tencentcloud',
  Other = 'other',
}

let hasDetected = false
let cloudPlatform: CloudPlatform = CloudPlatform.Unknown

export function hasPreflight(): boolean {
  return hasDetected
}

export async function preflightRuntimeCloudPlatform() {
  if (hasDetected) {
    return
  }

  if (await checkIsInternalAsync()) {
    cloudPlatform = CloudPlatform.TencentCloud
  } else {
    cloudPlatform = CloudPlatform.Other
  }

  hasDetected = true
}

export function getCloudPlatform() {
  return cloudPlatform
}

export function checkIsInScf() {
  return process.env.TENCENTCLOUD_RUNENV === 'SCF'
}

export function checkIsInCBR() {
  // CBR = CLOUDBASE_RUN
  return !!process.env.CBR_ENV_ID
}

const kSumeruEnvSet = new Set(['formal', 'pre', 'test'])
export function checkIsInSumeru() {
  // SUMERU_ENV=formal | test | pre
  return kSumeruEnvSet.has(process.env.SUMERU_ENV)
}

export async function checkIsInTencentCloud(): Promise<boolean> {
  if (process.env.TENCENTCLOUD === 'true') {
    return true
  }
  return isNonEmptyString(await lookupAppId())
}

export function checkIsInternal(): boolean {
  return checkIsInScf() || checkIsInCBR() || checkIsInSumeru()
}

export async function checkIsInternalAsync(): Promise<boolean> {
  return checkIsInternal() ? await Promise.resolve(true) : await checkIsInTencentCloud()
}

export async function getCurrRunEnvTag(): Promise<string> {
  if (checkIsInScf()) {
    return 'scf'
  } else if (checkIsInCBR()) {
    return 'cbr'
  } else if (checkIsInSumeru()) {
    return 'sumeru'
  } else if (await checkIsInTencentCloud()) {
    return 'tencentcloud'
  }
  return 'unknown'
}
