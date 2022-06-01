use std::marker::PhantomData;
use std::str;

use cosmwasm_std::testing::{mock_env, MockApi, MockStorage};
use cosmwasm_std::{
    coin, from_binary, to_binary, BalanceResponse, BankQuery, OwnedDeps, QueryRequest,
    Uint128, WasmQuery,
};
use cw20::{BalanceResponse as Cw20BalanceResponse, Cw20QueryMsg};
use serde_json;

use super::super::contract::query;
use super::super::msg::{MultiQueryResponse, MultiQueryResponseItem, QueryMsg};
use super::custom_querier::CustomQuerier;

fn setup_test() -> OwnedDeps<MockStorage, MockApi, CustomQuerier> {
    let mut deps = OwnedDeps {
        storage: MockStorage::default(),
        api: MockApi::default(),
        querier: CustomQuerier::new(&[("alice", &[coin(12345, "uluna")])]),
        custom_query_type: PhantomData,
    };

    deps.querier.set_cw20_balance("bob", 69420);

    deps
}

fn create_mock_query() -> QueryMsg {
    vec![
        QueryRequest::Bank(BankQuery::Balance {
            address: "alice".to_string(),
            denom: "uluna".to_string(),
        }),
        QueryRequest::Wasm(WasmQuery::Smart {
            contract_addr: "mock_token".to_string(),
            msg: to_binary(&Cw20QueryMsg::Balance {
                address: "bob".to_string(),
            })
            .unwrap(),
        }),
        QueryRequest::Wasm(WasmQuery::Smart {
            contract_addr: "mock_token".to_string(),
            msg: to_binary(&Cw20QueryMsg::Balance {
                address: "charlie".to_string(),
            })
            .unwrap(),
        }),
    ]
}

fn create_mock_response() -> MultiQueryResponse {
    vec![
        MultiQueryResponseItem {
            success: true,
            data: to_binary(&BalanceResponse {
                amount: coin(12345, "uluna"),
            })
            .unwrap(),
        },
        MultiQueryResponseItem {
            success: true,
            data: to_binary(&Cw20BalanceResponse {
                balance: Uint128::new(69420),
            })
            .unwrap(),
        },
        MultiQueryResponseItem {
            success: false,
            data: "Cannot parse request: [mock]: balance not set for cw20 `mock_token` and user `charlie` in: ".as_bytes().into(),
        },
    ]
}

#[test]
fn querying() {
    let deps = setup_test();

    let res_bin = query(deps.as_ref(), mock_env(), create_mock_query()).unwrap();
    let res: MultiQueryResponse = from_binary(&res_bin).unwrap();

    assert_eq!(res, create_mock_response());
}

#[test]
fn deserializing_query() {
    let json = r#"[
        {
            "bank": {
                "balance": {
                    "address": "alice",
                    "denom": "uluna"
                }
            }
        },
        {
            "wasm": {
                "smart": {
                    "contract_addr": "mock_token",
                    "msg": "eyJiYWxhbmNlIjp7ImFkZHJlc3MiOiJib2IifX0="
                }
            }
        },
        {
            "wasm": {
                "smart": {
                    "contract_addr": "mock_token",
                    "msg": "eyJiYWxhbmNlIjp7ImFkZHJlc3MiOiJjaGFybGllIn19"
                }
            }
        }
    ]"#;

    let deserialized: QueryMsg = serde_json::from_str(json).unwrap();
    assert_eq!(deserialized, create_mock_query());
}

#[test]
fn serializing_response() {
    let json = r#"[
        {
            "success": true,
            "data": "eyJhbW91bnQiOnsiZGVub20iOiJ1bHVuYSIsImFtb3VudCI6IjEyMzQ1In19"
        },
        {
            "success": true,
            "data": "eyJiYWxhbmNlIjoiNjk0MjAifQ=="
        },
        {
            "success": false,
            "data": "Q2Fubm90IHBhcnNlIHJlcXVlc3Q6IFttb2NrXTogYmFsYW5jZSBub3Qgc2V0IGZvciBjdzIwIGBtb2NrX3Rva2VuYCBhbmQgdXNlciBgY2hhcmxpZWAgaW46IA=="
        }
    ]"#;

    let deps = setup_test();
    let res_bin = query(deps.as_ref(), mock_env(), create_mock_query()).unwrap();

    assert_eq!(str::from_utf8(res_bin.as_slice()).unwrap(), json.replace("\n", "").replace(" ", ""));
}
