/**
 * useTokens.ts — Stub file. Token features have been removed from Tele-Blast.
 * Hooks are retained for import compatibility with other pages.
 */

export interface TokenBalances {
  taiTokens: number;
  ltaiTokens: number;
  isLoading: boolean;
  refetch: () => void;
}

export function useTokens(): TokenBalances {
  return {
    taiTokens: 0,
    ltaiTokens: 0,
    isLoading: false,
    refetch: () => {},
  };
}

export function usePurchaseTaiTokens() {
  return async (_packageId: string): Promise<string> => {
    throw new Error("Token purchases are not available on the $30 Pro plan.");
  };
}

export function usePurchaseLtaiTokens() {
  return async (_packageId: string): Promise<string> => {
    throw new Error("Token purchases are not available on the $30 Pro plan.");
  };
}

export function useAdminGrantTokens() {
  return async (
    _principal: import("@icp-sdk/core/principal").Principal,
    _taiAmount: number,
    _ltaiAmount: number,
  ): Promise<void> => {
    throw new Error("Token grants are not available.");
  };
}

export function useGetUserTokenStats() {
  return async (_principal: import("@icp-sdk/core/principal").Principal) => {
    return {
      taiTokens: 0,
      ltaiTokens: 0,
      totalTaiPurchased: 0,
      totalLtaiPurchased: 0,
    };
  };
}
