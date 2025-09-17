import React, { useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Copy, Plus, Trash2, Wand2 } from "lucide-react";
import Stream from "stream";

// -----------------------------
// Verb Cheat Sheet
// -----------------------------
const VERBS = {
  Technical: [
    "Resolved",
    "Optimized",
    "Upgraded",
    "Refined",
    "Automated",
    "Stabilized",
    "Implemented",
    "Delivered",
    "Hardened",
    "Containerized",
    "Instrumented",
  ],
  Collaboration: [
    "Guided",
    "Mentored",
    "Supported",
    "Facilitated",
    "Collaborated",
    "Enabled",
    "Coordinated",
    "Unblocked",
  ],
  Leadership: [
    "Proposed",
    "Initiated",
    "Streamlined",
    "Standardized",
    "Championed",
    "Owned",
    "Prioritized",
  ],
  Innovation: [
    "Identified",
    "Suggested",
    "Explored",
    "Designed",
    "Documented",
    "Prototyped",
    "Benchmarked",
  ],
};

// -----------------------------
// Emoji mapping for categories/verbs
// -----------------------------
const CATEGORY_EMOJI: Record<keyof typeof VERBS, string> = {
  Technical: "🛠️",
  Collaboration: "🤝",
  Leadership: "🧭",
  Innovation: "💡",
};

// Specific overrides for some verbs where an icon clarifies intent better than group default
const VERB_EMOJI_OVERRIDES: Record<string, string> = {
  Documented: "📝",
  Prototyped: "🧪",
  Benchmarked: "📊",
  Containerized: "🐳",
  Instrumented: "📈",
  Mentored: "🧑‍🏫",
  Unblocked: "🧹",
  Delivered: "🎁",
  Optimized: "⚡",
  Resolved: "✅",
  Upgraded: "⬆️",
  Refined: "🔧",
  Automated: "🤖",
  Stabilized: "⚖",
  Implemented: "💻",
  Hardened: "💎",
  Guided: "🧭",
  Supported: "💪",
  Facilitated: "🎖️",
  Collaborated: "🤝",
  Enabled: "🚀",
  Coordinated: "🤹",
  Proposed: "🫴🏻",
  Initiated: "🚦",
  Streamlined: "🛤️",
  Standardized: "📏",
  Championed: "🏆",
  Owned: "🎯",
  Prioritized: "🔝",
  Identified: "🔍",
  Suggested: "💡",
  Explored: "🧭",
  Designed: "🎨",
};

const emojiForVerb = (verb: string): string => {
  if (!verb) return "";
  if (VERB_EMOJI_OVERRIDES[verb]) return VERB_EMOJI_OVERRIDES[verb];
  // find the category the verb belongs to
  for (const [cat, verbs] of Object.entries(VERBS) as Array<[
    keyof typeof VERBS,
    string[]
  ]>) {
    if (verbs.includes(verb)) return CATEGORY_EMOJI[cat];
  }
  return "✅"; // sensible default
};

// Convert a past-tense verb to -ing (simple heuristic)
const toIng = (verb: string) => {
  // special cases
  if (verb.endsWith("e") && !verb.endsWith("ee")) return verb.slice(0, -1) + "ing";
  if (verb.endsWith("ed")) return verb.replace(/ed$/i, "ing");
  if (verb === "Owned") return "Owning";
  return verb + "ing";
};

// -----------------------------
// Types
// -----------------------------
interface Item {
  id: string;
  verb: string; // base verb (past tense form from list)
  task: string; // what you did / are doing
  impact: string; // impact/outcome
}

type SectionKey = "yesterday" | "today" | "blockers";

// -----------------------------
// Small utilities
// -----------------------------
const newId = () => Math.random().toString(36).slice(2, 9);

const SectionHeader: React.FC<{ title: string; hint: string }> = ({ title, hint }) => (
  <div className="flex items-baseline justify-between gap-2 mb-2">
    <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
    <span className="text-xs text-muted-foreground">{hint}</span>
  </div>
);

const VerbMenu: React.FC<{
  value: string;
  onSelect: (v: string) => void;
  asIng?: boolean;
}> = ({ value, onSelect, asIng }) => {
  const renderLabel = (v: string) => (asIng ? toIng(v) : v);
  const renderWithEmoji = (v: string) => {
    const emoji = emojiForVerb(v);
    return `${emoji ? emoji + " " : ""}${renderLabel(v)}`;
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="sm" className="min-w-36 justify-between border border-gray-300 bg-white hover:bg-gray-50">
          <span className="truncate">{value ? renderWithEmoji(value) : "Choose verb"}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="max-h-72 overflow-auto bg-white border border-gray-100">
        <DropdownMenuLabel>Action verbs</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {Object.entries(VERBS).map(([group, verbs]) => (
          <div key={group} className="px-1 mb-4 bg-white">
            <div className="text-[11px] uppercase tracking-wider text-muted-foreground p-2 bg-gray-100">
              <span className="mr-1">{CATEGORY_EMOJI[group as keyof typeof VERBS]}</span>
              {group}
            </div>
            {verbs.map((v) => (
              <DropdownMenuItem key={v} onClick={() => onSelect(v)} className="cursor-pointer pl-2 hover:bg-blue-50">
                {renderWithEmoji(v)}
              </DropdownMenuItem>
            ))}
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const ItemRow: React.FC<{
  section: SectionKey;
  item: Item;
  onChange: (patch: Partial<Item>) => void;
  onRemove: () => void;
}> = ({ section, item, onChange, onRemove }) => {
  const ing = section === "today";
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[auto,1fr,1fr,auto] gap-2 items-start">
      <div className="flex gap-2">
        <VerbMenu value={item.verb} onSelect={(v) => onChange({ verb: v })} asIng={ing} />
      </div>
      <Input
        placeholder={ing ? "Task (what you are doing)" : "Task (what you did)"}
        value={item.task}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange({ task: e.target.value })}
      />
      <Input
        placeholder={section === "blockers" ? "Risk / workaround" : "Impact / outcome"}
        value={item.impact}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange({ impact: e.target.value })}
      />
      <Button variant="ghost" size="icon" onClick={onRemove} aria-label="Remove row">
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
};

const sectionMeta: Record<SectionKey, { title: string; hint: string }> = {
  yesterday: {
    title: "Yesterday",
    hint: "Past tense • Formula: [Verb] + [what you did] → [impact]",
  },
  today: {
    title: "Today",
    hint: "Present continuous • Formula: [Verb-ing] + [task] → [expected outcome]",
  },
  blockers: {
    title: "Blockers",
    hint: "Dependencies/risks • Formula: [Need/Waiting] → [risk or workaround]",
  },
};

const defaultItems: Record<SectionKey, Item[]> = {
  yesterday: [
  ],
  today: [
  ],
  blockers: [],
};

export default function StandupBuilderApp() {
  const [items, setItems] = useState<Record<SectionKey, Item[]>>(defaultItems);
  const [notes, setNotes] = useState("");

  const addItem = (section: SectionKey) => {
    setItems((prev) => ({
      ...prev,
      [section]: [...prev[section], { id: newId(), verb: "", task: "", impact: "" }],
    }));
  };

  const updateItem = (section: SectionKey, id: string, patch: Partial<Item>) => {
    setItems((prev) => ({
      ...prev,
      [section]: prev[section].map((it) => (it.id === id ? { ...it, ...patch } : it)),
    }));
  };

  const removeItem = (section: SectionKey, id: string) => {
    setItems((prev) => ({
      ...prev,
      [section]: prev[section].filter((it) => it.id !== id),
    }));
  };

  const compiled = useMemo(() => {
    const lines: string[] = [];
    const mk = (s: SectionKey, label: string) => {
      if (!items[s].length) return;
      lines.push(`**${label}**`);
      items[s].forEach((it) => {
        if (!it.task && !it.verb && !it.impact) return;
        const verb = s === "today" && it.verb ? toIng(it.verb) : it.verb;
        const emoji = emojiForVerb(it.verb);
        if (s === "blockers") {
          const need = it.task || "Waiting/Need";
          const risk = it.impact || "may affect timeline";
          lines.push(`- ${need} → ${risk}.`);
        } else {
          const left = [emoji, verb, it.task].filter(Boolean).join(" ");
          const right = it.impact ? ` → ${it.impact}` : "";
          lines.push(`- ${left}${right}.`);
        }
      });
      lines.push("");
    };
    mk("yesterday", "Yesterday");
    mk("today", "Today");
    mk("blockers", "Blockers");
    if (notes.trim()) {
      lines.push(`_Notes_: ${notes.trim()}`);
    }
    return lines.join("\n");
  }, [items, notes]);

  const copyCompiled = async () => {
    try {
      await navigator.clipboard.writeText(compiled);
      alert("Copied to clipboard ✅");
    } catch (e) {
      alert("Could not copy. Select and copy manually.");
    }
  };

  const resetAll = () => setItems({ yesterday: [], today: [], blockers: [] });

  return (
    <div className="min-h-screen w-full bg-white text-gray-900 p-4 md:p-8">
      <div className="mx-auto max-w-5xl space-y-6">
        <header className="flex items-center justify-between gap-3">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Stand‑Up Builder (Impact‑First)</h1>
          <div className="flex gap-2">
            <Button variant="outline" onClick={resetAll}>
              <Wand2 className="h-4 w-4 mr-2" />New blank
            </Button>
            <Button onClick={copyCompiled}>
              <Copy className="h-4 w-4 mr-2" />Copy update
            </Button>
          </div>
        </header>

        <Card className="shadow-sm">
          <CardContent className="p-4 md:p-6 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary">Formula</Badge>
              <span className="text-sm">Yesterday: <b>[Verb]</b> + [what you did] → [impact]</span>
              <span className="text-sm">Today: <b>[Verb‑ing]</b> + [task] → [expected outcome]</span>
              <span className="text-sm">Blockers: <b>[Need/Waiting]</b> → [risk/workaround]</span>
            </div>

            <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
              {Object.entries(VERBS).map(([group, verbs]) => (
                <div key={group} className="flex items-start gap-2 bg-muted/40 px-2 py-1 rounded-xl">
                  <span className="uppercase tracking-wider text-[10px] pt-1">
                    <span className="mr-1">{CATEGORY_EMOJI[group as keyof typeof VERBS]}</span>
                    {group}
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {verbs.map((v) => (
                      <Badge key={v} variant="outline" className="rounded-full">
                        <span className="mr-1">{emojiForVerb(v)}</span>
                        {v}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/** Sections **/}
        {(["yesterday", "today", "blockers"] as SectionKey[]).map((section) => (
          <Card key={section} className="shadow-sm">
            <CardContent className="p-4 md:p-6 space-y-3">
              <SectionHeader title={sectionMeta[section].title} hint={sectionMeta[section].hint} />

              <div className="space-y-2">
                {items[section].map((it) => (
                  <ItemRow
                    key={it.id}
                    section={section}
                    item={it}
                    onChange={(patch) => updateItem(section, it.id, patch)}
                    onRemove={() => removeItem(section, it.id)}
                  />
                ))}
              </div>

              <div className="flex justify-between items-center pt-1">
                <Button variant="secondary" size="sm" onClick={() => addItem(section)}>
                  <Plus className="h-4 w-4 mr-2" />Add line
                </Button>
                {section === "blockers" && (
                  <span className="text-xs text-muted-foreground">Tip: list dependencies, approvals, credentials, or external teams. Offer a workaround if possible.</span>
                )}
              </div>
            </CardContent>
          </Card>
        ))}

        <Card className="shadow-sm">
          <CardContent className="p-4 md:p-6 space-y-3">
            <h2 className="text-xl font-semibold tracking-tight">Notes (optional)</h2>
            <Textarea
              value={notes}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNotes(e.target.value)}
              placeholder="Any context you want to add (e.g., demo timing, stakeholder FYIs, links)"
            />
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardContent className="p-4 md:p-6 space-y-3">
            <h2 className="text-xl font-semibold tracking-tight">Preview</h2>
            <pre className="whitespace-pre-wrap text-sm bg-muted/40 p-3 rounded-xl border">
{compiled}
            </pre>
            <div className="flex gap-2">
              <Button onClick={copyCompiled}>
                <Copy className="h-4 w-4 mr-2" />Copy update
              </Button>
            </div>
          </CardContent>
        </Card>

        <footer className="text-xs text-muted-foreground text-center py-4">
          Built for clear, impact‑first stand‑ups. Keep Yesterday → past, Today → -ing, Blockers → dependencies.
        </footer>
      </div>
    </div>
  );
}
