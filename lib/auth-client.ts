import { createAuthClient } from "better-auth/react";
import { PolarEmbedCheckout } from "@polar-sh/checkout/embed";
import type { BetterAuthClientPlugin } from "better-auth";
import type { BetterFetchOption } from "better-auth/client";
import type { CheckoutParams, polar } from "./index";
// import { polarClient } from "@polar-sh/better-auth";

// Copied from https://github.com/polarsource/polar-adapters/blob/main/packages/polar-betterauth/src/client.ts
// Issue: https://github.com/better-auth/better-auth/issues/5539
const _polarClient = () => {
	return {
		id: "polar-client",
		$InferServerPlugin: {} as ReturnType<typeof polar>,
		getActions: ($fetch) => {
			return {
				checkoutEmbed: async (
					data: Omit<CheckoutParams, "redirect" | "embedOrigin">,
					fetchOptions?: BetterFetchOption,
				) => {
					const res = await $fetch("/checkout", {
						method: "POST",
						body: {
							...data,
							redirect: false,
							embedOrigin: window.location.origin,
						},
						...fetchOptions,
					});

					if (res.error) {
						throw new Error(res.error.message);
					}

					const checkout = res.data as { url: string };

					const theme =
						(new URL(checkout.url).searchParams.get("theme") as
							| "light"
							| "dark"
							| undefined) ?? "light";

					return await PolarEmbedCheckout.create(checkout.url, theme);
				},
			};
		},
	} satisfies BetterAuthClientPlugin;
};

export const authClient = createAuthClient({
	plugins: [_polarClient()],
});