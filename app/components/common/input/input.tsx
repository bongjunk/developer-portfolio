"use client";

import {
  ChangeEvent,
  InputHTMLAttributes,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { Control, useController } from "react-hook-form";
import _ from "lodash";
import { match, P } from "ts-pattern";
import ErrorIcon from "../../icons/ErrorIcon";

export type ErrorType = {
  message?: string;
};

export type InputProps = {
  format: FormatType;
  adornments?: ReactNode;
  error?: ErrorType;
  control: Control<any> | undefined;
  name: string;
} & InputHTMLAttributes<HTMLInputElement>;

const Input = ({ ...props }: InputProps) => {
  const { name, control } = props;

  const inputMode = match(props.format).with("number", "number_format", () => {
    return { inputMode: "numeric" };
  });

  const { field } = useController({
    name,
    control,
  });

  const [renderValue, setRenderValue] = useState(
    toFormat(_.toString(props.value ?? ""))(props.format)
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const format = toFormat(_.toString(e.target.value))(props.format);
    setRenderValue(format);
    field.onChange(format);
  };

  const isAdornments = !!props.adornments;

  useEffect(() => {
    if (field.value) {
      return setRenderValue(toFormat(_.toString(field.value))(props.format));
    }
  }, [field.value, props.format]);

  return (
    <>
      <div className="w-full">
        <div className="relative">
          <input
            className={`w-full h-8 text-xs text-[#404044] border border-[#D2D2DD] rounded-md block py-1.5 px-1.5 placeholder:text-gray-400 hover:border-[#404044] hover:ring-[0.5px] hover:ring-inset hover:ring-[#404044] focus:border-[#426DF6] focus:ring-[0.5px] focus:ring-inset focus:ring-[#426DF6] focus:hover:border-[#426DF6] focus:hover:ring-[#426DF6] active:border-[#426DF6] active:shadow-[0_0_5px_0_rgb(66,109,246,0.50)] focus:active:ring-[#426DF6] disabled:pointer-events-none disabled:bg-[#ECEBF4]  disabled:text-[#9b9ba8] ${
              isAdornments && "pr-7"
            }} disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200 ${
              props.error &&
              "!border-[#E92447] hover:border-[#E92447] hover:ring-[#E92447] focus:border-[#E92447] focus:ring-[#E92447] focus:hover:border-[#E92447] focus:hover:ring-[#E92447] active:shadow-none focus:active:ring-[#E92447]"
            }`}
            {...inputMode}
            {...props}
            {...field}
            ref={field.ref}
            value={renderValue}
            onChange={handleChange}
          />
          {isAdornments && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-xs text-gray-500">
              <div className="pointer-events-auto">{props.adornments}</div>
            </div>
          )}
        </div>
        {props.error && (
          <div className="flex items-center ml-1.5 mt-0.5 gap-0.5">
            <div className="flex items-start w-3">
              <ErrorIcon width={12} height={12} />
            </div>
            <span className="text-[0.625rem] font-normal text-[#E92447] tracking-[-0.0125rem]">
              {props.error.message}
            </span>
          </div>
        )}
      </div>
    </>
  );
};

export default Input;

export type FormatType =
  | "text"
  | "email"
  | "password"
  | "number"
  | "number_format"
  | "person_reg_no"
  | "business_number"
  | "phone_number"
  | "fax_number"
  | "driver_license_no"
  | "trim_text";

const toFormat = (value?: string) => (format?: FormatType) =>
  match({
    value,
    format,
  })
    .with({ value: P.string, format: "password" }, ({ value }) => value)
    .with({ value: P.string, format: "number" }, ({ value }) => {
      return value.replace(/[^\d]/g, "");
    })
    .with({ value: P.string, format: "number_format" }, ({ value }) => {
      const num = value.replace(/[^\d]/g, "");
      return num ? Intl.NumberFormat("ko-KR").format(_.toNumber(num)) : "";
    })
    .with({ value: P.string, format: "person_reg_no" }, ({ value }) => {
      const re = value
        .replace(/[^\d]/g, "")
        .replace(/(?<a>[\d]{6})(?<b>[\d]{7})/g, "$<a>-$<b>");

      return re.substring(0, 14);
    })
    .with({ value: P.string, format: "business_number" }, ({ value }) => {
      const num = value
        .replace(/[^\d]/g, "")
        .replace(/(?<a>[\d]{3})(?<b>[\d]{2})(?<c>[\d]{5})/g, "$<a>-$<b>-$<c>");
      return num.substring(0, 12);
    })
    .with({ value: P.string, format: "email" }, ({ value }) => {
      return value.replace(/[^a-zA-Z0-9@._-]/g, "");
    })
    .with(
      { value: P.string, format: "phone_number" },
      { value: P.string, format: "fax_number" },
      ({ value }) => {
        const re = value
          .replace(/[^\d]/g, "")
          .replace(
            /^(01\d{1}|02|0303|0505|0502|0506|0\d{1,2})(\d{3,4})(\d{4})/g,
            `$1-$2-$3`
          );

        return re.substring(0, 13);
      }
    )
    .with({ value: P.string, format: "driver_license_no" }, ({ value }) => {
      const re = value
        .replace(/[^\d]/g, "")
        .replace(/(?<a>[\d]{2})(?<b>[\d]{6})(?<c>[\d]{2})/g, "$<a>-$<b>-$<c>");

      return re.substring(0, 12);
    })
    .with({ value: P.string, format: "trim_text" }, ({ value }) => {
      return _.trim(value);
    })
    .otherwise(() => value ?? "");
