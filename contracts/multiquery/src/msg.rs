use cosmwasm_std::{Binary, Empty, QueryRequest};
use schemars::JsonSchema;
use serde::{Deserialize, Serialize};

pub type QueryMsg = Vec<QueryRequest<Empty>>;

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct MultiQueryResponseItem {
    pub success: bool,
    pub data: Binary,
}

pub type MultiQueryResponse = Vec<MultiQueryResponseItem>;
