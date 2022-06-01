/* eslint-disable */
import Long from "long";
import * as _m0 from "protobufjs/minimal";
import { Validator } from "../../../cosmos/staking/v1beta1/staking";

export const protobufPackage = "cosmos.staking.v1beta1";

/** QueryValidatorRequest is response type for the Query/Validator RPC method */
export interface QueryValidatorRequest {
  /** validator_addr defines the validator address to query for. */
  validatorAddr: string;
}

/** QueryValidatorResponse is response type for the Query/Validator RPC method */
export interface QueryValidatorResponse {
  /** validator defines the the validator info. */
  validator: Validator | undefined;
}

function createBaseQueryValidatorRequest(): QueryValidatorRequest {
  return { validatorAddr: "" };
}

export const QueryValidatorRequest = {
  encode(
    message: QueryValidatorRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.validatorAddr !== "") {
      writer.uint32(10).string(message.validatorAddr);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryValidatorRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryValidatorRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.validatorAddr = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryValidatorRequest {
    return {
      validatorAddr: isSet(object.validatorAddr)
        ? String(object.validatorAddr)
        : "",
    };
  },

  toJSON(message: QueryValidatorRequest): unknown {
    const obj: any = {};
    message.validatorAddr !== undefined &&
      (obj.validatorAddr = message.validatorAddr);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryValidatorRequest>, I>>(
    object: I
  ): QueryValidatorRequest {
    const message = createBaseQueryValidatorRequest();
    message.validatorAddr = object.validatorAddr ?? "";
    return message;
  },
};

function createBaseQueryValidatorResponse(): QueryValidatorResponse {
  return { validator: undefined };
}

export const QueryValidatorResponse = {
  encode(
    message: QueryValidatorResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.validator !== undefined) {
      Validator.encode(message.validator, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryValidatorResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryValidatorResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.validator = Validator.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryValidatorResponse {
    return {
      validator: isSet(object.validator)
        ? Validator.fromJSON(object.validator)
        : undefined,
    };
  },

  toJSON(message: QueryValidatorResponse): unknown {
    const obj: any = {};
    message.validator !== undefined &&
      (obj.validator = message.validator
        ? Validator.toJSON(message.validator)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<QueryValidatorResponse>, I>>(
    object: I
  ): QueryValidatorResponse {
    const message = createBaseQueryValidatorResponse();
    message.validator =
      object.validator !== undefined && object.validator !== null
        ? Validator.fromPartial(object.validator)
        : undefined;
    return message;
  },
};

type Builtin =
  | Date
  | Function
  | Uint8Array
  | string
  | number
  | boolean
  | undefined;

export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin
  ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & Record<
        Exclude<keyof I, KeysOfUnion<P>>,
        never
      >;

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
