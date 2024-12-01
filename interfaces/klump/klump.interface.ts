export interface KlumpOnErrorResponse {
    type: string;
    message: string;
}

export interface KlumpOnOpenOrOnLoadResponse {
    type: string;
    status: boolean;
}

export interface KlumpResponseData {
    data: {
        reference: string;
        redirect_url: boolean | string;
    };
    status: string;
}

export interface KlumpOnSuccessResponse {
   data: {
    data: KlumpResponseData;
    type: string;
    status: boolean;
   }
}