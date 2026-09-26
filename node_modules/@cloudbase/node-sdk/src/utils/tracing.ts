import { CloudBase } from '../cloudbase'

export interface ITracingInfo {
  eventId: string
  seqId: string
  trace: string
}

let seqNum = 0

function getSeqNum() {
  return ++seqNum
}

function generateEventId() {
  return Date.now().toString(16) + '_' + getSeqNum().toString(16)
}

export const generateTracingInfo = (id: string): ITracingInfo => {
  const { TCB_SEQID = '', TCB_TRACELOG } = CloudBase.getCloudbaseContext()

  const eventId = generateEventId()
  const seqId = id
    ? `${id}-${eventId}`
    : (TCB_SEQID ? `${TCB_SEQID}-${eventId}` : eventId)

  return { eventId, seqId, trace: TCB_TRACELOG }
}
