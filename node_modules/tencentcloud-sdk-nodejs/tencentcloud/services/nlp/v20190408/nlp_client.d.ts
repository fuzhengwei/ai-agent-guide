import { AbstractClient } from "../../../common/abstract_client";
import { ClientConfig } from "../../../common/interface";
import { SentenceCorrectionResponse, ParseWordsRequest, SentenceCorrectionRequest, AnalyzeSentimentRequest, AnalyzeSentimentResponse, ParseWordsResponse } from "./nlp_models";
/**
 * nlp client
 * @class
 */
export declare class Client extends AbstractClient {
    constructor(clientConfig: ClientConfig);
    /**
     * NLP 技术的句子纠错、情感分析、词法分析 API 接口将于2026年4月15日下线，届时将无法正常调用。为了避免对您的业务造成影响，请您尽快做好相关业务调整。如果您有 NLP 技术的产品需求，推荐您调用[腾讯混元大模型](https://cloud.tencent.com/product/tclm)。

智能识别并纠正句子中的语法、拼写、用词等错误，确保文本的准确性和可读性。
     */
    SentenceCorrection(req: SentenceCorrectionRequest, cb?: (error: string, rep: SentenceCorrectionResponse) => void): Promise<SentenceCorrectionResponse>;
    /**
     * NLP 技术的句子纠错、情感分析、词法分析 API 接口将于2026年4月15日下线，届时将无法正常调用。为了避免对您的业务造成影响，请您尽快做好相关业务调整。如果您有 NLP 技术的产品需求，推荐您调用[腾讯混元大模型](https://cloud.tencent.com/product/tclm)。

通过精准地对文本进行分词、词性标注、命名实体识别等功能，助您更好地理解文本内容，挖掘出潜在的价值信息。
     */
    ParseWords(req: ParseWordsRequest, cb?: (error: string, rep: ParseWordsResponse) => void): Promise<ParseWordsResponse>;
    /**
     * NLP 技术的句子纠错、情感分析、词法分析 API 接口将于2026年4月15日下线，届时将无法正常调用。为了避免对您的业务造成影响，请您尽快做好相关业务调整。如果您有 NLP 技术的产品需求，推荐您调用[腾讯混元大模型](https://cloud.tencent.com/product/tclm)。

情感分析接口能够对带有情感色彩的主观性文本进行分析、处理、归纳和推理，识别出用户的情感倾向，是积极、中性还是消极，并且提供各自概率。
     */
    AnalyzeSentiment(req: AnalyzeSentimentRequest, cb?: (error: string, rep: AnalyzeSentimentResponse) => void): Promise<AnalyzeSentimentResponse>;
}
