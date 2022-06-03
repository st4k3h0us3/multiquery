# multiquery

On-chain query batcher for CosmWasm. Similar to [SCB 10X](https://github.com/scb-10x)'s [multicall](https://github.com/scb-10x/multicall) contract, but supports any serializable query request, not limited to WASM queries.

## Example

Query:

```javascript
const response = await terra.wasm.contractQuery(MULTIQUERY, [
  {
    bank: {
      all_balances: {
        address: RED_BANK,
      },
    },
  },
  {
    wasm: {
      smart: {
        contract_addr: MARS_TOKEN,
        msg: encodeBase64({ token_info: {} }),
      },
    },
  },
]);

const responseParsed = response.map((item) => { return decodeBase64(item.data); });

console.log(responseParsed);
```

Response:

```json
[
  {
    "amount": [
      {
        "denom": "uluna",
        "amount": "622641301593"
      },
      {
        "denom": "uusd",
        "amount": "169517320897682"
      }
    ]
  },
  {
    "name": "MARS",
    "symbol": "MARS",
    "decimals": 6,
    "total_supply": "1000000000000000"
  }
]
```

See [`./scripts/3_query_example.ts`](./scripts/3_query_example.ts) for details.

## Deployment

| Network    | Address                                                                                                                                                                           |
|------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| pisco-1    | [`terra1mgrye4409qt9yen33rrwnj06eau56kh96ajjr2fcxvcc4etawp9qhsgf8f`](https://finder.terra.money/testnet/address/terra1mgrye4409qt9yen33rrwnj06eau56kh96ajjr2fcxvcc4etawp9qhsgf8f) |
| Columbus-5 | [`terra1swrywzkphty20e2uzpy582xu836luw0e5yp25m`](https://terrasco.pe/mainnet/address/terra1swrywzkphty20e2uzpy582xu836luw0e5yp25m)                                                |
| Bombay-12  | [`terra1t5twwglq9vlmf0pz8yadmd6gr6es2gfc4fkjww`](https://terrasco.pe/testnet/address/terra1t5twwglq9vlmf0pz8yadmd6gr6es2gfc4fkjww)                                                |

## License

Contents of this repository are open source under [GNU General Public License v3](https://github.com/scb-10x/multicall) or later.
