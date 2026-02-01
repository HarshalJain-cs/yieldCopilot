"use client";

import { useState } from "react";
import { useActiveAccount, useSendTransaction } from "thirdweb/react";
import {
  parseTokenAmount,
  prepareApproveTransaction,
  prepareSupplyTransaction,
} from "@/lib/aave-deposit";
import { getChainConfig, type SupportedChainId } from "@/lib/chains-config";
import { thirdwebClient } from "@/lib/thirdweb";

interface DepositButtonProps {
  tokenSymbol: string;
  amount: string;
  chainId: SupportedChainId;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export function DepositButton({
  tokenSymbol,
  amount,
  chainId,
  onSuccess,
  onError,
}: DepositButtonProps) {
  const account = useActiveAccount();
  const { mutate: sendTransaction, isPending } = useSendTransaction();
  const [status, setStatus] = useState<string>("");
  const [step, setStep] = useState<number>(0);

  const handleDeposit = async () => {
    if (!account) {
      alert("Please connect your wallet first!");
      return;
    }

    try {
      const config = getChainConfig(chainId);
      const tokenAddress =
        config.tokens[tokenSymbol as keyof typeof config.tokens];
      const decimals =
        tokenSymbol === "USDC" || tokenSymbol === "USDT" ? 6 : 18;
      const amountInWei = parseTokenAmount(amount, decimals);

      // Step 1: Approve
      setStep(1);
      setStatus(`Approving ${tokenSymbol}...`);

      const approveTx = prepareApproveTransaction(
        thirdwebClient,
        tokenAddress,
        amountInWei,
        chainId,
      );

      await new Promise<void>((resolve, reject) => {
        sendTransaction(approveTx, {
          onSuccess: () => {
            console.log("✅ Approval successful");
            resolve();
          },
          onError: (error) => {
            console.error("❌ Approval failed:", error);
            reject(error);
          },
        });
      });

      await new Promise((resolve) => setTimeout(resolve, 3000));

      // Step 2: Supply to Aave
      setStep(2);
      setStatus(`Depositing ${amount} ${tokenSymbol} to Aave...`);

      const supplyTx = prepareSupplyTransaction(
        thirdwebClient,
        tokenAddress,
        amountInWei,
        account.address,
        chainId,
      );

      await new Promise<void>((resolve, reject) => {
        sendTransaction(supplyTx, {
          onSuccess: () => {
            console.log("✅ Deposit successful");
            setStep(3);
            setStatus(
              `Success! You're now earning interest on ${amount} ${tokenSymbol}`,
            );
            resolve();
            onSuccess?.();
          },
          onError: (error) => {
            console.error("❌ Deposit failed:", error);
            reject(error);
          },
        });
      });
    } catch (error) {
      console.error("Transaction failed:", error);
      setStatus(
        `Error: ${error instanceof Error ? error.message : "Transaction failed"}`,
      );
      setStep(0);
      onError?.(error as Error);
    }
  };

  if (!account) {
    return (
      <button
        type="button"
        className="px-6 py-3 bg-gray-400 text-white rounded-lg cursor-not-allowed"
        disabled
      >
        Connect Wallet First
      </button>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <button
        type="button"
        onClick={handleDeposit}
        disabled={isPending || step > 0}
        className={`px-6 py-3 rounded-lg font-semibold transition-all ${
          isPending || step > 0
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-green-600 hover:bg-green-700 text-white"
        }`}
      >
        {step === 0 && `Deposit ${amount} ${tokenSymbol}`}
        {step === 1 && "Approving..."}
        {step === 2 && "Depositing..."}
        {step === 3 && "✅ Deposited!"}
      </button>

      {status && (
        <p className="text-sm text-gray-600 dark:text-gray-400">{status}</p>
      )}

      {step === 3 && (
        <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
          <p className="text-green-800 dark:text-green-200 font-semibold">
            🎉 Success! Your {tokenSymbol} is now earning interest in Aave!
          </p>
          <p className="text-sm text-green-700 dark:text-green-300 mt-2">
            You'll receive aTokens (a{tokenSymbol}) in your wallet. These
            automatically increase in value as you earn interest.
          </p>
        </div>
      )}
    </div>
  );
}
