"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { MessageCircle, X, Send, Loader2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { CONTACT_EMAIL } from "@/lib/siteConfig";

const STORAGE_KEY = "billbot_session_id";

const STARTER_MESSAGE =
  "Hi! I'm BillBot 👋 I help patients understand how to lower their medical bills. How can I help you today?";

const EXAMPLE_QUESTIONS = [
  "Can you help with a $2,000 hospital bill?",
  "How does BillRelief's pricing work?",
  "Is my information safe?",
  "How is BillRelief different from other services?",
];

type ChatRole = "user" | "assistant";

interface ChatLine {
  id: string;
  role: ChatRole;
  content: string;
}

function uid() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

type WidgetView = "chat" | "human";

export function BillBotWidget() {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<WidgetView>("chat");
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatLine[]>([
    { id: "welcome", role: "assistant", content: STARTER_MESSAGE },
  ]);
  const [historyLoaded, setHistoryLoaded] = useState(false);
  const [ephemeralNotice, setEphemeralNotice] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const [humanName, setHumanName] = useState("");
  const [humanEmail, setHumanEmail] = useState("");
  const [humanPhone, setHumanPhone] = useState("");
  const [humanSubject, setHumanSubject] = useState("");
  const [humanMessage, setHumanMessage] = useState("");
  const [humanWebsite, setHumanWebsite] = useState("");
  const [humanSubmitting, setHumanSubmitting] = useState(false);
  const [humanSuccess, setHumanSuccess] = useState(false);
  const [humanError, setHumanError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setSessionId(stored);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    if (!open || historyLoaded) return;

    const load = async () => {
      let sid = sessionId;
      try {
        if (!sid) sid = localStorage.getItem(STORAGE_KEY);
      } catch {
        /* ignore */
      }

      if (!sid) {
        setHistoryLoaded(true);
        return;
      }

      try {
        const res = await fetch(
          `/api/support-chat?sessionId=${encodeURIComponent(sid)}`
        );
        if (res.ok) {
          const data = await res.json();
          const rows = data.messages as { role: string; content: string }[];
          if (rows?.length) {
            setMessages(
              rows.map((m, i) => ({
                id: `hist-${i}-${m.role}`,
                role: m.role as ChatRole,
                content: m.content,
              }))
            );
          }
        }
      } catch {
        /* keep default welcome */
      } finally {
        setHistoryLoaded(true);
      }
    };

    void load();
  }, [open, sessionId, historyLoaded]);

  useEffect(() => {
    if (!open) {
      setHistoryLoaded(false);
      setView("chat");
      setHumanSuccess(false);
      setHumanError(null);
    }
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open, view]);

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || sending) return;

      setError(null);
      setSending(true);
      const conversation = messages
        .filter((m) => m.role === "user" || m.role === "assistant")
        .map((m) => ({ role: m.role, content: m.content }));

      const userLine: ChatLine = { id: uid(), role: "user", content: trimmed };
      setMessages((m) => [...m, userLine]);
      setInput("");

      try {
        const res = await fetch("/api/support-chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: trimmed,
            sessionId: sessionId ?? undefined,
            conversation,
          }),
        });

        const data = await res.json().catch(() => ({}));

        if (!res.ok) {
          throw new Error(data.error ?? "Request failed");
        }

        const persisted = data.persisted !== false;
        if (!persisted) {
          setEphemeralNotice(true);
          setSessionId(null);
          try {
            localStorage.removeItem(STORAGE_KEY);
          } catch {
            /* ignore */
          }
        }

        const sid = data.sessionId as string | undefined;
        const reply = data.reply as string | undefined;
        if (persisted && sid) {
          setEphemeralNotice(false);
          setSessionId(sid);
          try {
            localStorage.setItem(STORAGE_KEY, sid);
          } catch {
            /* ignore */
          }
        }
        if (reply) {
          setMessages((m) => [
            ...m,
            { id: uid(), role: "assistant", content: reply },
          ]);
        }
      } catch (e: unknown) {
        const msg =
          e instanceof Error ? e.message : "Something went wrong. Try again.";
        setError(msg);
        setMessages((m) => m.filter((x) => x.id !== userLine.id));
      } finally {
        setSending(false);
      }
    },
    [sessionId, sending, messages]
  );

  async function submitHumanForm(e: React.FormEvent) {
    e.preventDefault();
    setHumanError(null);
    setHumanSubmitting(true);
    try {
      const res = await fetch("/api/support-human", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: humanName.trim(),
          email: humanEmail.trim(),
          phone: humanPhone.trim() || undefined,
          subject: humanSubject.trim(),
          message: humanMessage.trim(),
          sessionId: sessionId ?? undefined,
          website: humanWebsite || undefined,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(
          typeof data.error === "string"
            ? data.error
            : "Could not send. Try again."
        );
      }
      setHumanSuccess(true);
      setHumanName("");
      setHumanEmail("");
      setHumanPhone("");
      setHumanSubject("");
      setHumanMessage("");
      setHumanWebsite("");
    } catch (err) {
      setHumanError(
        err instanceof Error ? err.message : "Something went wrong."
      );
    } finally {
      setHumanSubmitting(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          "fixed bottom-5 right-5 z-[100] flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2",
          open ? "pointer-events-none opacity-0" : "opacity-100",
          "bg-[#0F4C81] text-white focus:ring-[#0F4C81]"
        )}
        aria-label="Open BillBot chat"
      >
        <MessageCircle className="h-7 w-7" />
      </button>

      {open && (
        <div
          className="fixed bottom-5 right-5 z-[100] flex w-[min(100vw-1.5rem,400px)] max-h-[min(85vh,560px)] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
          role="dialog"
          aria-label={view === "chat" ? "BillBot chat" : "Customer support form"}
        >
          <div className="flex items-center justify-between gap-2 border-b border-slate-100 bg-[#0F4C81] px-4 py-3 text-white">
            <div>
              <p className="font-semibold">
                {view === "chat" ? "BillBot" : "Customer support"}
              </p>
              <p className="text-xs text-white/80">
                {view === "chat"
                  ? "BillRelief assistant"
                  : `Replies from ${CONTACT_EMAIL}`}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-lg p-1.5 hover:bg-white/10"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {view === "human" ? (
            <div className="flex flex-1 flex-col overflow-hidden min-h-0">
              <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3">
                <button
                  type="button"
                  onClick={() => {
                    setView("chat");
                    setHumanSuccess(false);
                    setHumanError(null);
                  }}
                  className="inline-flex items-center gap-1 text-xs text-[#0F4C81] font-medium hover:underline"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  Back to BillBot
                </button>

                {humanSuccess ? (
                  <p className="text-sm text-slate-700 leading-relaxed">
                    Thank you — we received your message and will get back to
                    you as soon as possible at{" "}
                    <span className="font-medium">{CONTACT_EMAIL}</span>.
                  </p>
                ) : (
                  <>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Sorry to keep you waiting — unfortunately all of our
                      agents are currently busy or away. Please leave a message
                      and we will get back to you as soon as possible.
                      What&apos;s the best email to reach you on?
                    </p>
                    <form
                      id="billbot-human-form"
                      onSubmit={submitHumanForm}
                      className="space-y-3"
                    >
                      <input
                        type="text"
                        name="website"
                        value={humanWebsite}
                        onChange={(e) => setHumanWebsite(e.target.value)}
                        className="absolute -left-[9999px] h-0 w-0 opacity-0"
                        tabIndex={-1}
                        autoComplete="off"
                        aria-hidden="true"
                      />
                      <div className="space-y-1.5">
                        <Label htmlFor="bb-h-name" className="text-xs">
                          Name <span className="text-red-600">*</span>
                        </Label>
                        <Input
                          id="bb-h-name"
                          required
                          value={humanName}
                          onChange={(e) => setHumanName(e.target.value)}
                          className="h-9 text-sm"
                          maxLength={120}
                          autoComplete="name"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="bb-h-email" className="text-xs">
                          Email <span className="text-red-600">*</span>
                        </Label>
                        <Input
                          id="bb-h-email"
                          type="email"
                          required
                          value={humanEmail}
                          onChange={(e) => setHumanEmail(e.target.value)}
                          className="h-9 text-sm"
                          maxLength={255}
                          autoComplete="email"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="bb-h-phone" className="text-xs">
                          Phone
                        </Label>
                        <Input
                          id="bb-h-phone"
                          type="tel"
                          value={humanPhone}
                          onChange={(e) => setHumanPhone(e.target.value)}
                          className="h-9 text-sm"
                          maxLength={32}
                          autoComplete="tel"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="bb-h-subject" className="text-xs">
                          Subject <span className="text-red-600">*</span>
                        </Label>
                        <Input
                          id="bb-h-subject"
                          required
                          value={humanSubject}
                          onChange={(e) => setHumanSubject(e.target.value)}
                          className="h-9 text-sm"
                          maxLength={200}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="bb-h-msg" className="text-xs">
                          Message <span className="text-red-600">*</span>
                        </Label>
                        <textarea
                          id="bb-h-msg"
                          required
                          value={humanMessage}
                          onChange={(e) => setHumanMessage(e.target.value)}
                          className="w-full min-h-[100px] rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-[#0F4C81] focus:ring-1 focus:ring-[#0F4C81]"
                          maxLength={8000}
                        />
                      </div>
                      {humanError && (
                        <p className="text-xs text-red-600" role="alert">
                          {humanError}
                        </p>
                      )}
                      <Button
                        type="submit"
                        className="w-full bg-[#0F4C81] hover:bg-[#0d3d6a]"
                        disabled={humanSubmitting}
                      >
                        {humanSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin inline" />
                            Sending…
                          </>
                        ) : (
                          "Submit"
                        )}
                      </Button>
                    </form>
                  </>
                )}
              </div>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3 min-h-[220px] max-h-[340px]">
                <p className="text-[11px] leading-snug text-slate-500 px-1">
                  General questions only — don&apos;t share account numbers,
                  SSN, or full medical details here. Use the secure bill upload
                  in your dashboard for documents.{" "}
                  <button
                    type="button"
                    onClick={() => setView("human")}
                    className="text-[#0F4C81] font-semibold underline-offset-2 hover:underline"
                  >
                    Talk with a human
                  </button>
                </p>
                {ephemeralNotice && (
                  <p className="text-[11px] leading-snug text-amber-700 bg-amber-50 rounded-lg px-2 py-1.5 mx-1">
                    Chat can&apos;t be saved right now (database unreachable).
                    Your replies still work for this session only.
                  </p>
                )}
                {messages.map((m) => (
                  <div
                    key={m.id}
                    className={cn(
                      "flex",
                      m.role === "user" ? "justify-end" : "justify-start"
                    )}
                  >
                    <div
                      className={cn(
                        "max-w-[90%] rounded-2xl px-3 py-2 text-sm leading-relaxed",
                        m.role === "user"
                          ? "bg-[#0F4C81] text-white rounded-br-md"
                          : "bg-slate-100 text-slate-800 rounded-bl-md"
                      )}
                    >
                      {m.content}
                    </div>
                  </div>
                ))}
                {sending && (
                  <div className="flex justify-start">
                    <div className="flex items-center gap-2 rounded-2xl rounded-bl-md bg-slate-100 px-3 py-2 text-sm text-slate-500">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Thinking…
                    </div>
                  </div>
                )}
                <div ref={bottomRef} />
              </div>

              {messages.length <= 1 && !sending && (
                <div className="px-3 pb-2 flex flex-wrap gap-1.5">
                  {EXAMPLE_QUESTIONS.map((q) => (
                    <button
                      key={q}
                      type="button"
                      onClick={() => sendMessage(q)}
                      className="text-left text-xs rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-slate-700 hover:bg-slate-100"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}

              <div className="px-3 pb-2">
                <button
                  type="button"
                  onClick={() => setView("human")}
                  className="text-xs text-[#0F4C81] font-medium hover:underline"
                >
                  Talk with a human →
                </button>
              </div>

              {error && (
                <p className="px-3 text-xs text-red-600" role="alert">
                  {error}
                </p>
              )}

              <form
                className="flex gap-2 border-t border-slate-100 p-3"
                onSubmit={(e) => {
                  e.preventDefault();
                  sendMessage(input);
                }}
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your question…"
                  className="flex-1 rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-[#0F4C81] focus:ring-1 focus:ring-[#0F4C81]"
                  maxLength={4000}
                  disabled={sending}
                  autoComplete="off"
                />
                <Button
                  type="submit"
                  size="icon"
                  disabled={sending || !input.trim()}
                  className="shrink-0 rounded-xl bg-[#0F4C81] hover:bg-[#0d3d6a]"
                  aria-label="Send message"
                >
                  {sending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </form>
            </>
          )}
        </div>
      )}
    </>
  );
}
