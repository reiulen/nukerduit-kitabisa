import React, { useState } from "react";
import LayoutBackOffice from "@/components/Layout/LayoutBackoffice/Layout.component";
import { numberFormatDescimals } from "@/utils/helpers/helper";
import InputLabel from "@/components/ui/Input/InputLabel";
import { useForm } from "react-hook-form";
import SelectLabel from "@/components/ui/Select/SelectLabel";
import { FetchListRateCurrencyQuery } from "@/services/useListRateCurrencyQuery";
import { debounce } from "lodash";
import { MutationTransaction } from "@/services/useTransactionQuery";
import Button from "@/components/ui/Button/Button";
import Swal from "sweetalert2";

type InputBuyTransaction = {
  currency?: {
    value: string;
    label: string;
    data: {
      currency: string;
      rate: number;
    };
  };
  amount?: string;
  total?: string;
};

type Error = {
  [key: string]: string[];
};

export default function BuyTransactionIndex() {
  const [error, setError] = useState<Error>({
    code_currency: [],
    amount: [],
    total: [],
  });

  const [searchText, setSearchText] = useState<string>("");

  const handleSearchCurrency = debounce((query: string) => {
    setSearchText(query);
  }, 300);

  const {
    data: dataListCurrency,
    isLoading,
    isPending,
  } = FetchListRateCurrencyQuery({
    keyword: searchText,
  });

  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors },
    watch,
    reset,
    clearErrors,
  } = useForm<InputBuyTransaction>();

  const { mutate, isPending: isPendigMutation } = MutationTransaction({
    onError: (error) => {
      setError(error?.response?.data?.errors || {});
    },
    onSuccess: (data) => {
      Swal.fire({
        title: "Success",
        text: data?.message,
        icon: "success",
      });
      handleResetForm();
      clearErrors();
    },
  });

  const onSubmit = async (data: InputBuyTransaction) => {
    const { currency, amount, total } = data;
    mutate({
      code_currency: currency?.data?.currency,
      rate_exchange: currency?.data?.rate,
      amount: amount?.replace(/[^0-9.]/g, ""),
      total: total?.replace(/[^0-9.]/g, ""),
      type: 1,
    });
  };

  const handleResetForm = () => {
    reset({
      currency: {
        value: "",
        label: "",
        data: {
          currency: "",
          rate: 0,
        },
      },
      amount: "",
      total: "",
    });
  };

  const handleChangeCurrency = () => {
    let value = getValues()?.amount || "";
    value = value.replace(/[^0-9.]/g, "");
    const total = numberFormatDescimals(
      value * (getValues()?.currency?.data?.rate || 0)
    );
    setValue("amount", value);
    setValue("total", total);
  };

  return (
    <LayoutBackOffice>
      <div className="flex items-center mb-6">
        <div className="text-2xl font-bold">Buy Currency</div>
      </div>
      <div className="w-[40%]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <SelectLabel
            label="Currency"
            error={errors.currency?.message || error?.code_currency?.[0]}
            name="currency"
            classNameForm="mb-4"
            classNameLabel="mb-2"
            placeholder="Select Currency"
            onChange={() => {
              handleChangeCurrency();
            }}
            rules={{
              required: "Currency is required",
            }}
            control={control}
            option={dataListCurrency?.data?.map(
              (item: { currency: string; label: string }) => ({
                value: item.currency,
                label: item?.currency,
                data: item,
              })
            )}
            getOptionLabel={(option) => {
              return (
                <div className="flex items-center justify-between">
                  <div className="text-lg font-semibold">
                    {option?.label?.toUpperCase()}
                  </div>
                  <div className="text-lg font-medium text-gray-500">
                    {numberFormatDescimals(option?.data?.rate as string)}
                  </div>
                </div>
              );
            }}
            isLoading={isLoading || isPending}
            onInputChange={handleSearchCurrency}
          />
          <InputLabel
            label="Amount"
            className="mb-4"
            classNameInput={`h-12 ${!watch("currency") && "bg-gray-300"}`}
            placeholder="0.00"
            error={errors?.amount?.message || error?.amount?.[0]}
            disabled={watch("currency") ? false : true}
            type="text"
            {...register("amount", {
              required: "Amount is required",
              onChange: handleChangeCurrency,
            })}
          />
          <InputLabel
            label="Total in IDR"
            className="mb-4"
            classNameInput="h-12 bg-gray-300"
            placeholder="0.00"
            error={errors?.total?.message || error?.total?.[0]}
            disabled
            type="text"
            {...register("total", {
              required: "Total is required",
            })}
          />
          <div className="flex gap-3 items-center mt-6">
            <Button isLoading={isPendigMutation} variant="green">
              Submit
            </Button>
            <Button
              type="button"
              onClick={() => handleResetForm()}
              variant="blue"
            >
              Reset
            </Button>
          </div>
        </form>
      </div>
    </LayoutBackOffice>
  );
}
