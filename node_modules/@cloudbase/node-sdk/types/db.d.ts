/* eslint-disable @typescript-eslint/method-signature-style */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-extraneous-class */
/* eslint-disable @typescript-eslint/naming-convention */
import { IKeyValue, ICustomReqOpts, IBaseResult } from './index'

import { IInnerCloudBaseConfig } from './internal'

export interface ICountRes extends IBaseResult {
  total?: number
}

export declare namespace Database {
  interface GeoType {
    Point: typeof Point
    LineString: typeof LineString
    MultiLineString: typeof MultiLineString
    MultiPoint: typeof MultiPoint
    MultiPolygon: typeof MultiPolygon
    Polygon: typeof Polygon
  }

  class HiddenSymbol {
    constructor(target: any)
  }

  class InternalSymbol extends HiddenSymbol {
    constructor(target: any, __mark__: any)
    static for(target: any): InternalSymbol
  }

  type OrderByDirection = 'desc' | 'asc'

  enum QueryType {
    WHERE = 'WHERE',
    DOC = 'DOC'
  }

  interface ISerializedPoint {
    type: string
    coordinates: [number, number]
  }
  interface ISerializedLineString {
    type: string
    coordinates: Array<[number, number]>
  }
  interface ISerializedPolygon {
    type: string
    coordinates: Array<Array<[number, number]>>
  }
  interface ISerializedMultiPoint {
    type: string
    coordinates: Array<[number, number]>
  }
  interface ISerializedMultiLineString {
    type: string
    coordinates: Array<Array<[number, number]>>
  }
  interface ISerializedMultiPolygon {
    type: string
    coordinates: Array<Array<Array<[number, number]>>>
  }

  export class Point {
    readonly latitude: number
    readonly longitude: number
    constructor(longitude: number, latitude: number)
    parse(
      key: any
    ): Record<number, {
      type: string
      coordinates: number[]
    }>
    toJSON(): {
      type: string
      coordinates: number[]
    }
    toReadableString(): string
    static validate(point: ISerializedPoint): boolean
    readonly _internalType: InternalSymbol
  }

  export class LineString {
    readonly points: Point[]
    constructor(points: Point[])
    parse(
      key: any
    ): Record<number, {
      type: string
      coordinates: number[][]
    }>
    toJSON(): {
      type: string
      coordinates: number[][]
    }
    static validate(lineString: ISerializedLineString): boolean
    static isClosed(lineString: LineString): boolean
    readonly _internalType: InternalSymbol
  }

  export class MultiLineString {
    readonly lines: LineString[]
    constructor(lines: LineString[])
    parse(
      key: any
    ): Record<number, {
      type: string
      coordinates: number[][][]
    }>
    toJSON(): {
      type: string
      coordinates: number[][][]
    }
    static validate(multiLineString: ISerializedMultiLineString): boolean
    readonly _internalType: InternalSymbol
  }

  export class MultiPoint {
    readonly points: Point[]
    constructor(points: Point[])
    parse(
      key: any
    ): Record<number, {
      type: string
      coordinates: number[][]
    }>
    toJSON(): {
      type: string
      coordinates: number[][]
    }
    static validate(multiPoint: ISerializedMultiPoint): boolean
    readonly _internalType: InternalSymbol
  }

  export class MultiPolygon {
    public readonly polygons: Polygon[]
    public constructor(polygons: Polygon[])
    parse(
      key: any
    ): Record<number, {
      type: string
      coordinates: number[][][][]
    }>
    toJSON(): {
      type: string
      coordinates: number[][][][]
    }
    static validate(multiPolygon: ISerializedMultiPolygon): boolean
    readonly _internalType: InternalSymbol
  }

  export class Polygon {
    readonly lines: LineString[]
    constructor(lines: LineString[])
    parse(
      key: any
    ): Record<number, {
      type: string
      coordinates: number[][][]
    }>
    toJSON(): {
      type: string
      coordinates: number[][][]
    }
    static validate(polygon: ISerializedPolygon): boolean
    static isCloseLineString(lineString: any): boolean
    readonly _internalType: InternalSymbol
  }

  export class RegExp {
    $regularExpression?: {
      pattern?: string
      options?: string
    }

    constructor({ regexp, options }: { regexp: string, options: string })
    parse(): {
      $regularExpression: {
        pattern: string
        options: string
      }
    }
    readonly _internalType: InternalSymbol
  }

  export class ServerDate {
    readonly offset: number
    constructor({ offset }?: { offset?: number })
    readonly _internalType: InternalSymbol
    parse(): {
      $tcb_server_date: {
        offset: number
      }
    }
  }

  /**
   * 数据库模块的通用请求方法
   *
   * @author haroldhu
   * @internal
   */
  class DBRequest {
    private readonly config
    /**
       * 初始化
       *
       * @internal
       * @param config
       */
    constructor(config: IInnerCloudBaseConfig)
    /**
       * 发送请求
       *
       * @param dbParams   - 数据库请求参数
       * @param opts  - 可选配置项
       */
    send(api: string, data: any, opts?: ICustomReqOpts): Promise<any>
  }

  export class Db {
    Geo: GeoType
    command: typeof Command
    RegExp: (param: { regexp: string, options: string }) => RegExp
    serverDate: (opt: { offset: number }) => ServerDate
    startTransaction: () => Promise<Transaction>
    runTransaction: (
      /* eslint-disable-next-line */
      callback: (transaction: Transaction) => void | Promise<any>,
      times?: number
    ) => Promise<any>

    config: IInnerCloudBaseConfig
    static reqClass: DBRequest
    static dataVersion: string
    constructor(config?: IInnerCloudBaseConfig)
    collection(collName: string): CollectionReference
    createCollection(collName: string): IBaseResult
  }

  export class DocumentReference {
    readonly id: string | number
    readonly _transactionId: string
    readonly projection: Object
    private readonly _apiOptions
    set(data: Object): Promise<IUpdateResult>
    update(data: Object): Promise<IUpdateResult>
    delete(): Promise<IDeleteResult>
    remove(): Promise<IDeleteResult>
    get(): Promise<IGetRes>
    field(projection: Object): DocumentReference
  }

  interface IStageItem {
    stageKey: string
    stageValue: string
  }

  export class Aggregation {
    _db: Db
    _request: DBRequest
    _stages: IStageItem[]
    _collectionName: string
    constructor(db?: Db, collectionName?: string)
    end(): Promise<any>
    unwrap(): any[]
    done(): Array<Record<number, any>>
    _pipe(stage: string, param: any): this
    addFields(param: any): this
    bucket(param: any): this
    bucketAuto(param: any): this
    count(param: any): this
    geoNear(param: any): this
    group(param: any): this
    limit(param: any): this
    match(param: any): this
    project(param: any): this
    lookup(param: any): this
    replaceRoot(param: any): this
    sample(param: any): this
    skip(param: any): this
    sort(param: any): this
    sortByCount(param: any): this
    unwind(param: any): this
  }

  export class Query {
    protected _transactionId: string
    get(): Promise<IGetRes>
    count(): Promise<ICountRes>
    where(query: object): Query
    options(apiOptions: QueryOption | UpdateOption): Query
    orderBy(fieldPath: string, directionStr: OrderByDirection): Query
    limit(limit: number): Query
    skip(offset: number): Query
    update(data: Object): Promise<IUpdateResult>
    field(projection: any): Query
    remove(): Promise<IDeleteResult>
    updateAndReturn(data: Object): Promise<IUpdateAndReturnResult>
  }

  export class CollectionReference extends Query {
    protected _transactionId: string
    readonly name: string
    doc(docID: string | number): DocumentReference
    add(data: IKeyValue): Promise<IAddRes>
    aggregate(): Aggregation
    options(apiOptions: QueryOption | UpdateOption): CollectionReference
  }

  export interface IReqOpts {
    timeout: number
  }

  export type CenterSphere = [Point, number] | [[number, number], number]

  export interface IAddRes extends IBaseResult {
    ids?: string[] // 批量插入返回
    id?: string
    inserted?: number
    ok?: number
  }
  export interface IGetRes extends IBaseResult {
    data: any[]
    total: number
    limit: number
    offset: number
  }

  export interface BaseOption {
    timeout?: number
    raw?: boolean
  }

  export interface QueryOption extends BaseOption {
    limit?: number
    offset?: number
    projection?: Object
    order?: Array<Record<string, any>>
  }

  export interface UpdateOption extends BaseOption {
    multiple?: boolean
  }

  export enum QUERY_COMMANDS_LITERAL {
    EQ = 'eq',
    NEQ = 'neq',
    GT = 'gt',
    GTE = 'gte',
    LT = 'lt',
    LTE = 'lte',
    IN = 'in',
    NIN = 'nin',
    ALL = 'all',
    ELEM_MATCH = 'elemMatch',
    EXISTS = 'exists',
    SIZE = 'size',
    MOD = 'mod',
    GEO_NEAR = 'geoNear',
    GEO_WITHIN = 'geoWithin',
    GEO_INTERSECTS = 'geoIntersects'
  }

  export enum LOGIC_COMMANDS_LITERAL {
    AND = 'and',
    OR = 'or',
    NOT = 'not',
    NOR = 'nor'
  }
  export class LogicCommand {
    fieldName: string | InternalSymbol
    operator: LOGIC_COMMANDS_LITERAL | string
    operands: any[]
    _internalType: InternalSymbol
    constructor(
      operator: LOGIC_COMMANDS_LITERAL | string,
      operands: any,
      fieldName?: string | InternalSymbol
    )
    _setFieldName(fieldName: string): LogicCommand
    and(...__expressions__: LogicCommand[]): LogicCommand
    or(...__expressions__: LogicCommand[]): LogicCommand
  }

  export class QueryCommand extends LogicCommand {
    operator: QUERY_COMMANDS_LITERAL
    constructor(
      operator: QUERY_COMMANDS_LITERAL,
      operands: any,
      fieldName?: string | InternalSymbol
    )
    toJSON():
    | {
      ['$ne']: any
    }
    | {
      [x: string]: any
      $ne?: undefined
    }
    _setFieldName(fieldName: string): QueryCommand
    eq(val: any): LogicCommand
    neq(val: any): LogicCommand
    gt(val: any): LogicCommand
    gte(val: any): LogicCommand
    lt(val: any): LogicCommand
    lte(val: any): LogicCommand
    in(list: any[]): LogicCommand
    nin(list: any[]): LogicCommand
    geoNear(val: IGeoNearOptions): LogicCommand
    geoWithin(val: IGeoWithinOptions): LogicCommand
    geoIntersects(val: IGeoIntersectsOptions): LogicCommand
  }

  export enum UPDATE_COMMANDS_LITERAL {
    SET = 'set',
    REMOVE = 'remove',
    INC = 'inc',
    MUL = 'mul',
    PUSH = 'push',
    PULL = 'pull',
    PULL_ALL = 'pullAll',
    POP = 'pop',
    SHIFT = 'shift',
    UNSHIFT = 'unshift',
    ADD_TO_SET = 'addToSet',
    BIT = 'bit',
    RENAME = 'rename',
    MAX = 'max',
    MIN = 'min'
  }
  export class UpdateCommand {
    fieldName: string | InternalSymbol
    operator: UPDATE_COMMANDS_LITERAL
    operands: any
    _internalType: InternalSymbol
    constructor(
      operator: UPDATE_COMMANDS_LITERAL,
      operands?: any,
      fieldName?: string | InternalSymbol
    )
    _setFieldName(fieldName: string): UpdateCommand
  }

  export interface IGeoNearOptions {
    geometry: Point
    maxDistance?: number
    minDistance?: number
  }
  export interface IGeoWithinOptions {
    geometry?: Polygon | MultiPolygon
    centerSphere?: CenterSphere
  }
  export interface IGeoIntersectsOptions {
    geometry: Point | LineString | Polygon | MultiPoint | MultiLineString | MultiPolygon
  }

  interface TransactionAPI {
    send(interfaceName: string, param?: any): any
  }
  export class Transaction {
    private readonly _id: string
    private readonly _db: Db
    private readonly _request
    aborted: boolean
    abortReason: any
    commited: boolean
    inited: boolean
    constructor(db: Db)
    init(): Promise<void>
    collection(collName: string): CollectionReference
    getTransactionId(): string
    getRequestMethod(): TransactionAPI
    commit(): Promise<CommitResult>
    rollback(customRollbackRes: any): Promise<RollbackResult>
  }

  export interface CommitResult {
    requestId: string
  }

  export interface RollbackResult {
    requestId: string
  }

  export interface IUpdateResult extends IBaseResult {
    updated?: number
    upserted?: JsonString
  }

  export interface IUpdateAndReturnResult extends IBaseResult {
    updated?: number
    doc?: any
  }

  export interface ISetResult extends IUpdateResult {
    upserted: JsonString
  }

  export interface IDeleteResult extends IBaseResult {
    deleted: number | string
  }

  type JsonString = string

  export type IQueryCondition = Record<string, any> | LogicCommand
  export const Command: {
    eq(val: any): QueryCommand
    neq(val: any): QueryCommand
    lt(val: any): QueryCommand
    lte(val: any): QueryCommand
    gt(val: any): QueryCommand
    gte(val: any): QueryCommand
    in(val: any): QueryCommand
    nin(val: any): QueryCommand
    all(val: any): QueryCommand
    elemMatch(val: any): QueryCommand
    exists(val: boolean): QueryCommand
    size(val: number): QueryCommand
    mod(val: number[]): QueryCommand
    geoNear(val: any): QueryCommand
    geoWithin(val: any): QueryCommand
    geoIntersects(val: any): QueryCommand
    and(...__expressions__: IQueryCondition[]): LogicCommand
    nor(...__expressions__: IQueryCondition[]): LogicCommand
    or(...__expressions__: IQueryCondition[]): LogicCommand
    not(...__expressions__: IQueryCondition[]): LogicCommand
    set(val: any): UpdateCommand
    remove(): UpdateCommand
    inc(val: number): UpdateCommand
    mul(val: number): UpdateCommand
    push(...args: any[]): UpdateCommand
    pull(values: any): UpdateCommand
    pullAll(values: any): UpdateCommand
    pop(): UpdateCommand
    shift(): UpdateCommand
    unshift(...__values__: any[]): UpdateCommand
    addToSet(values: any): UpdateCommand
    rename(values: any): UpdateCommand
    bit(values: any): UpdateCommand
    max(values: any): UpdateCommand
    min(values: any): UpdateCommand
    expr(
      values: AggregationOperator
    ): {
      $expr: AggregationOperator
    }
    jsonSchema(
      schema: any
    ): {
      $jsonSchema: any
    }
    text(
      values:
      | string
      | {
        search: string
        language?: string
        caseSensitive?: boolean
        diacriticSensitive: boolean
      }
    ):
    | {
      $search: {
        (regexp: string | RegExp): number
        (searcher: { [Symbol.search](string: string): number }): number
      }
      $language?: undefined
      $caseSensitive?: undefined
      $diacriticSensitive?: undefined
    }
    | {
      $search: string
      $language: string
      $caseSensitive: boolean
      $diacriticSensitive: boolean
    }
    aggregate: {
      pipeline(): Aggregation
      abs: (param: any) => AggregationOperator
      add: (param: any) => AggregationOperator
      ceil: (param: any) => AggregationOperator
      divide: (param: any) => AggregationOperator
      exp: (param: any) => AggregationOperator
      floor: (param: any) => AggregationOperator
      ln: (param: any) => AggregationOperator
      log: (param: any) => AggregationOperator
      log10: (param: any) => AggregationOperator
      mod: (param: any) => AggregationOperator
      multiply: (param: any) => AggregationOperator
      pow: (param: any) => AggregationOperator
      sqrt: (param: any) => AggregationOperator
      subtract: (param: any) => AggregationOperator
      trunc: (param: any) => AggregationOperator
      arrayElemAt: (param: any) => AggregationOperator
      arrayToObject: (param: any) => AggregationOperator
      concatArrays: (param: any) => AggregationOperator
      filter: (param: any) => AggregationOperator
      in: (param: any) => AggregationOperator
      indexOfArray: (param: any) => AggregationOperator
      isArray: (param: any) => AggregationOperator
      map: (param: any) => AggregationOperator
      range: (param: any) => AggregationOperator
      reduce: (param: any) => AggregationOperator
      reverseArray: (param: any) => AggregationOperator
      size: (param: any) => AggregationOperator
      slice: (param: any) => AggregationOperator
      zip: (param: any) => AggregationOperator
      and: (param: any) => AggregationOperator
      not: (param: any) => AggregationOperator
      or: (param: any) => AggregationOperator
      cmp: (param: any) => AggregationOperator
      eq: (param: any) => AggregationOperator
      gt: (param: any) => AggregationOperator
      gte: (param: any) => AggregationOperator
      lt: (param: any) => AggregationOperator
      lte: (param: any) => AggregationOperator
      neq: (param: any) => AggregationOperator
      cond: (param: any) => AggregationOperator
      ifNull: (param: any) => AggregationOperator
      switch: (param: any) => AggregationOperator
      dateFromParts: (param: any) => AggregationOperator
      dateFromString: (param: any) => AggregationOperator
      dayOfMonth: (param: any) => AggregationOperator
      dayOfWeek: (param: any) => AggregationOperator
      dayOfYear: (param: any) => AggregationOperator
      isoDayOfWeek: (param: any) => AggregationOperator
      isoWeek: (param: any) => AggregationOperator
      isoWeekYear: (param: any) => AggregationOperator
      millisecond: (param: any) => AggregationOperator
      minute: (param: any) => AggregationOperator
      month: (param: any) => AggregationOperator
      second: (param: any) => AggregationOperator
      hour: (param: any) => AggregationOperator
      week: (param: any) => AggregationOperator
      year: (param: any) => AggregationOperator
      literal: (param: any) => AggregationOperator
      mergeObjects: (param: any) => AggregationOperator
      objectToArray: (param: any) => AggregationOperator
      allElementsTrue: (param: any) => AggregationOperator
      anyElementTrue: (param: any) => AggregationOperator
      setDifference: (param: any) => AggregationOperator
      setEquals: (param: any) => AggregationOperator
      setIntersection: (param: any) => AggregationOperator
      setIsSubset: (param: any) => AggregationOperator
      setUnion: (param: any) => AggregationOperator
      concat: (param: any) => AggregationOperator
      dateToString: (param: any) => AggregationOperator
      indexOfBytes: (param: any) => AggregationOperator
      indexOfCP: (param: any) => AggregationOperator
      split: (param: any) => AggregationOperator
      strLenBytes: (param: any) => AggregationOperator
      strLenCP: (param: any) => AggregationOperator
      strcasecmp: (param: any) => AggregationOperator
      substr: (param: any) => AggregationOperator
      substrBytes: (param: any) => AggregationOperator
      substrCP: (param: any) => AggregationOperator
      toLower: (param: any) => AggregationOperator
      toUpper: (param: any) => AggregationOperator
      meta: (param: any) => AggregationOperator
      addToSet: (param: any) => AggregationOperator
      avg: (param: any) => AggregationOperator
      first: (param: any) => AggregationOperator
      last: (param: any) => AggregationOperator
      max: (param: any) => AggregationOperator
      min: (param: any) => AggregationOperator
      push: (param: any) => AggregationOperator
      stdDevPop: (param: any) => AggregationOperator
      stdDevSamp: (param: any) => AggregationOperator
      sum: (param: any) => AggregationOperator
      let: (param: any) => AggregationOperator
    }
    project: {
      slice: (param: any) => ProjectionOperator
      elemMatch: (param: any) => ProjectionOperator
    }
  }
  export class AggregationOperator {
    constructor(name: string, param: any)
  }
  export class ProjectionOperator {
    constructor(name: string, param: any)
  }
}
