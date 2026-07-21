import { Composer } from "grammy";
import type { Ctx } from "../bot.js";
import { inlineButton, inlineKeyboard } from "../toolkit/index.js";

// /delete_data — clear stored session history and email (if provided)
const composer = new Composer<Ctx>();

const CLEARED = "🗑️ Your session history and email (if provided) have been cleared.";

composer.command("delete_data", async (ctx) => {
  await ctx.reply(CLEARED, {
    reply_markup: inlineKeyboard([[inlineButton("⬅️ Back to menu", "menu:main")]]),
  });
});

export default composer;