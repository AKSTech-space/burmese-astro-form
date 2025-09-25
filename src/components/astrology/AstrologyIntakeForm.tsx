import React, { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { MysticalCard, MysticalCardHeader, MysticalCardTitle, MysticalCardDescription, MysticalCardContent } from "@/components/ui/mystical-card";
import { FormInput } from "./FormInput";
import { FormTextarea } from "./FormTextarea";
import { StatusBadge } from "./StatusBadge";
import { cn } from "@/lib/utils";

const initialState = {
  name: "",
  birthDate: "",
  birthTime: "",
  timeUnknown: false,
  birthPlace: "",
  gender: "",
  contactEmail: "",
  contactPhone: "",
  topics: [],
  questions: "",
  relationshipStatus: "",
  occupation: "",
  industry: "",
  timeline: "",
  budget: "",
  urgency: 3,
  attachments: "",
  currentCity: "",
  consent: false,
  language: "my",
};

const TOPIC_OPTIONS = [
  { id: "career", label: "အလုပ်အကိုင်/လုပ်ငန်း" },
  { id: "love", label: "ပေါင်းသင်းရေး/အချစ်ရေး" },
  { id: "finance", label: "ငွေကြေး/ရင်းနှီးမြှုပ်နှံ" },
  { id: "health", label: "ကျန်းမာရေး" },
  { id: "education", label: "ပညာရေး/သင်တန်း" },
  { id: "family", label: "မိသားစု/ထိတတ်မှု" },
  { id: "travel", label: "ခရီးသွား/ပြောင်းရွှေ့နေထိုင်" },
  { id: "business", label: "စီးပွားရေးစီမံချက်" },
  { id: "legal", label: "ဥပဒေ/ပုဒ်မဆိုင်ရာ" },
  { id: "spiritual", label: "ဝိညာဉ်ရေးရာ/စာစောင်" },
  { id: "immigration", label: "နိုင်ငံပြောင်း/ဗီဇာ" },
];

const RELATIONSHIP_OPTIONS = [
  "လွတ်လပ်", "နိဒါန်း", "နှီးနှောနေ", "လက်ထပ်ထား", "ခွဲခွာ/မတင်", "ပြောရန်မဖြစ်",
];

const TIMELINE_OPTIONS = [
  "၁ လ အတွင်း", "၃ လ အတွင်း", "၆ လ အတွင်း", "၁ နှစ် အတွင်း", "ရေရှည်", "သတ်မှတ်မထား"
];

interface SectionProps {
  title: string;
  children: React.ReactNode;
  description?: string;
  variant?: "default" | "cosmic" | "floating";
  glow?: boolean;
}

function Section({ title, children, description, variant = "default", glow = false }: SectionProps) {
  return (
    <MysticalCard variant={variant} glow={glow}>
      <MysticalCardHeader>
        <MysticalCardTitle>{title}</MysticalCardTitle>
        {description && (
          <MysticalCardDescription>{description}</MysticalCardDescription>
        )}
      </MysticalCardHeader>
      <MysticalCardContent className="space-y-6">
        {children}
      </MysticalCardContent>
    </MysticalCard>
  );
}

export default function AstrologyIntakeForm() {
  const [data, setData] = useState(initialState);
  const [touched, setTouched] = useState({});
  const [copied, setCopied] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const required = {
    name: !data.name,
    birthDate: !data.birthDate,
    birthPlace: !data.birthPlace,
    contact: !(data.contactEmail || data.contactPhone),
    topics: data.topics.length === 0,
    consent: !data.consent,
  };

  const remaining = 1000 - data.questions.length;

  function update(field, value) {
    setData((d) => ({ ...d, [field]: value }));
  }

  function toggleTopic(id) {
    setData((d) => ({
      ...d,
      topics: d.topics.includes(id)
        ? d.topics.filter((t) => t !== id)
        : [...d.topics, id],
    }));
  }

  function resetForm() {
    setData(initialState);
    setTouched({});
    setCopied(false);
    setDownloaded(false);
  }

  const topicLabels = useMemo(
    () => data.topics.map((t) => TOPIC_OPTIONS.find((x) => x.id === t)?.label).filter(Boolean),
    [data.topics]
  );

  const formattedSummary = useMemo(() => {
    const t = (k) => ({
      name: "အမည်",
      birthDate: "မွေးသက္ကရာဇ်",
      birthTime: "မွေးချိန်",
      birthPlace: "မွေးရပ်ဇာတိ/မြို့/နိုင်ငံ",
      gender: "လိင်",
      contactEmail: "အီးမေးလ်",
      contactPhone: "ဖုန်း",
      currentCity: "လက်ရှိနေထိုင်ရာမြို့",
      topics: "မေးလိုသည့် အဓိကရာထူး",
      questions: "အသေးစိတ်မေးခွန်းများ",
      relationshipStatus: "အိမ်ထောင်ရေးအခြေအနေ",
      occupation: "အလုပ်အကိုင်",
      industry: "လုပ်ငန်းခွင်",
      timeline: "အချိန်ကာလ",
      budget: "ဘတ်ဂျက်/ဆက်သွယ်ကြေး",
      urgency: "အရေးပေါ်အဆင့် (၁-၅)",
      attachments: "ထပ်ဆောင်းဖိုင်/လင့်ခ်",
    })[k];

    const timeText = data.timeUnknown ? "မသိ" : data.birthTime || "မထည့်ရသေး";

    const lines = [
      `${t("name")}: ${data.name || "-"}`,
      `${t("birthDate")}: ${data.birthDate || "-"}`,
      `${t("birthTime")}: ${timeText}`,
      `${t("birthPlace")}: ${data.birthPlace || "-"}`,
      `${t("gender")}: ${data.gender || "-"}`,
      `${t("contactEmail")}: ${data.contactEmail || "-"}`,
      `${t("contactPhone")}: ${data.contactPhone || "-"}`,
      `${t("currentCity")}: ${data.currentCity || "-"}`,
      `${t("topics")}: ${topicLabels.join(", ") || "-"}`,
      `${t("questions")}: ${data.questions || "-"}`,
      `${t("relationshipStatus")}: ${data.relationshipStatus || "-"}`,
      `${t("occupation")}: ${data.occupation || "-"}`,
      `${t("industry")}: ${data.industry || "-"}`,
      `${t("timeline")}: ${data.timeline || "-"}`,
      `${t("budget")}: ${data.budget || "-"}`,
      `${t("urgency")}: ${data.urgency}`,
      `${t("attachments")}: ${data.attachments || "-"}`,
    ];

    return `ဗေဒင်မေးမြန်းမှု အချက်အလက် စုစည်းချက်\n----------------------------------\n${lines.join("\n")}`;
  }, [data, topicLabels]);

  const allGood = Object.values(required).every((v) => !v);

  async function copySummary() {
    try {
      await navigator.clipboard.writeText(formattedSummary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      alert("ကော်ပီမရနိုင်ပါ။ Browser အားပြင်ဆင်ပါ။");
    }
  }

  function downloadJSON() {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `astrology-intake-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2000);
  }

  function onSubmit(e) {
    e.preventDefault();
    if (!allGood) {
      alert("လိုအပ်သောအချက်အလက်များကို စုံစမ်းပြီးဖြည့်ပါ။");
      return;
    }
    copySummary();
  }

  return (
    <div className="min-h-screen bg-mystical-gradient text-foreground">
      {/* Cosmic Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border shadow-cosmic">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold bg-golden-gradient bg-clip-text text-transparent">
                ဗေဒင်မေးခွန်း စုစည်းမှု
              </h1>
              <p className="text-muted-foreground mt-1">Mystical Astrology Consultation</p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                onClick={copySummary}
                variant="outline"
                size="sm"
              >
                {copied ? "ကော်ပီပြီး" : "အကျဉ်းချုပ် ကော်ပီ"}
              </Button>
              <Button
                onClick={downloadJSON}
                variant="secondary"
                size="sm"
              >
                {downloaded ? "ဒေါင်းလုဒ်ပြီး" : "JSON ဒေါင်းလုဒ်"}
              </Button>
              <Button
                onClick={resetForm}
                variant="mystical"
                size="sm"
              >
                ပြန်လည်ဖျက်မယ်
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-6 space-y-8">
        {/* Progress Indicators */}
        <div className="grid grid-cols-5 gap-3">
          {Object.entries({
            name: required.name,
            birthDate: required.birthDate,
            birthPlace: required.birthPlace,
            contact: required.contact,
            topics: required.topics,
          }).map(([k, v]) => (
            <div key={k} className="relative">
              <div className={cn(
                "h-3 rounded-full transition-all duration-500",
                v ? "bg-destructive/30" : "bg-gradient-to-r from-success to-primary animate-shimmer"
              )} />
              {!v && <div className="absolute inset-0 h-3 rounded-full bg-shimmer-gradient animate-shimmer" />}
            </div>
          ))}
        </div>

        <form onSubmit={onSubmit} className="space-y-8">
          {/* Basic Information */}
          <Section 
            title="မွန်မြတ်သော အခြေခံအချက်အလက်" 
            description="အမည်၊ မွေးရက်၊ မွေးနေရာ စသည်ဖြင့်"
            variant="cosmic"
            glow={true}
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-card-foreground">အမည်</span>
                  <StatusBadge isRequired={required.name} />
                </div>
                <FormInput
                  placeholder="ဥပမာ - အာကာစိုး"
                  value={data.name}
                  onChange={(e) => update("name", e.target.value)}
                  mystical={true}
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-card-foreground">မွေးသက္ကရာဇ်</span>
                  <StatusBadge isRequired={required.birthDate} />
                </div>
                <FormInput
                  type="date"
                  value={data.birthDate}
                  onChange={(e) => update("birthDate", e.target.value)}
                  mystical={true}
                />
              </div>

              <div className="space-y-2">
                <span className="text-sm font-medium text-card-foreground">မွေးချိန်</span>
                <div className="flex items-center gap-3">
                  <FormInput
                    type="time"
                    disabled={data.timeUnknown}
                    value={data.birthTime}
                    onChange={(e) => update("birthTime", e.target.value)}
                    className="flex-1"
                  />
                  <label className="flex items-center gap-2 text-sm text-card-foreground cursor-pointer">
                    <input
                      type="checkbox"
                      checked={data.timeUnknown}
                      onChange={(e) => update("timeUnknown", e.target.checked)}
                      className="rounded border-border text-primary focus:ring-primary"
                    />
                    <span>မသိ</span>
                  </label>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-card-foreground">မွေးရပ်ဇာတိ/မြို့/နိုင်ငံ</span>
                  <StatusBadge isRequired={required.birthPlace} />
                </div>
                <FormInput
                  placeholder="ဥပမာ - ပျဉ်းမနား၊ မြန်မာ"
                  value={data.birthPlace}
                  onChange={(e) => update("birthPlace", e.target.value)}
                  mystical={true}
                />
              </div>

              <div className="space-y-2">
                <span className="text-sm font-medium text-card-foreground">လိင်</span>
                <select
                  className="flex h-11 w-full rounded-lg border border-border bg-input px-3 py-2 text-sm text-card-foreground focus:border-ring focus:bg-input-focus focus:outline-none focus:ring-2 focus:ring-ring/20 transition-all duration-200"
                  value={data.gender}
                  onChange={(e) => update("gender", e.target.value)}
                >
                  <option value="">ရွေးချယ်ပါ</option>
                  <option value="male">ကျား</option>
                  <option value="female">မ</option>
                  <option value="other">အခြား</option>
                  <option value="skip">မပြောလို</option>
                </select>
              </div>

              <div className="space-y-2">
                <span className="text-sm font-medium text-card-foreground">လက်ရှိနေထိုင်ရာမြို့</span>
                <FormInput
                  placeholder="ဥပမာ - ရန်ကုန်"
                  value={data.currentCity}
                  onChange={(e) => update("currentCity", e.target.value)}
                />
              </div>
            </div>
          </Section>

          {/* Contact Information */}
          <Section title="ဆက်သွယ်ရန်" description="အနည်းဆုံး Email သို့မဟုတ် ဖုန်း တစ်ခုလိုအပ်သည်">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-card-foreground">အီးမေးလ်</span>
                  <StatusBadge isRequired={required.contact} />
                </div>
                <FormInput
                  type="email"
                  placeholder="you@example.com"
                  value={data.contactEmail}
                  onChange={(e) => update("contactEmail", e.target.value)}
                  mystical={true}
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-card-foreground">ဖုန်းနံပါတ်</span>
                  <StatusBadge isRequired={required.contact} />
                </div>
                <FormInput
                  type="tel"
                  placeholder="09xxxxxxxxx"
                  value={data.contactPhone}
                  onChange={(e) => update("contactPhone", e.target.value)}
                  mystical={true}
                />
              </div>
            </div>
          </Section>

          {/* Topics Section */}
          <Section 
            title="မေးလိုသည့် အဓိကအကြောင်းအရာ" 
            description="ဆိုင်ရာအားလုံးကို ရွေးနိုင်သည်"
            variant="floating"
          >
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {TOPIC_OPTIONS.map((opt) => (
                <label key={opt.id} className={cn(
                  "flex items-center gap-3 p-4 rounded-lg border cursor-pointer select-none transition-all duration-200",
                  "hover:scale-[1.02] hover:shadow-glow-primary/50",
                  data.topics.includes(opt.id) 
                    ? "bg-primary/20 border-primary text-card-foreground shadow-glow-primary/30" 
                    : "bg-card/50 border-border hover:border-primary/50"
                )}>
                  <input
                    type="checkbox"
                    checked={data.topics.includes(opt.id)}
                    onChange={() => toggleTopic(opt.id)}
                    className="rounded border-border text-primary focus:ring-primary"
                  />
                  <span className="text-sm font-medium">{opt.label}</span>
                </label>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <StatusBadge isRequired={required.topics} />
              <span className="text-sm text-muted-foreground">အနည်းဆုံး အကြောင်းအရာ ၁ ခုကို ရွေးပါ</span>
            </div>
          </Section>

          {/* Questions Section */}
          <Section 
            title="အသေးစိတ်မေးခွန်းများ" 
            description="သေချာတဲ့ မေးခွန်းများကို မြန်မာလို ရေးပါ (အများဆုံး ၁၀၀၀ စာလုံး)"
          >
            <FormTextarea
              maxLength={1000}
              placeholder="ဥပမာ: ၂၀၂၅ ခုနှစ်တွင် အလုပ်ပြောင်းသင့်/မသင့်၊ ဘယ်လအထိ စောင့်သင့်သလဲ..."
              value={data.questions}
              onChange={(e) => update("questions", e.target.value)}
              remaining={remaining}
              mystical={true}
            />
          </Section>

          {/* Background Information */}
          <Section title="နောက်ခံအချက်အလက် (ပြောချင်လျှင်သာ)">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <span className="text-sm font-medium text-card-foreground">အိမ်ထောင်ရေးအခြေအနေ</span>
                <select
                  className="flex h-11 w-full rounded-lg border border-border bg-input px-3 py-2 text-sm text-card-foreground focus:border-ring focus:bg-input-focus focus:outline-none focus:ring-2 focus:ring-ring/20 transition-all duration-200"
                  value={data.relationshipStatus}
                  onChange={(e) => update("relationshipStatus", e.target.value)}
                >
                  <option value="">ရွေးချယ်ပါ</option>
                  {RELATIONSHIP_OPTIONS.map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>

              <FormInput
                label="အလုပ်အကိုင်"
                placeholder="Network Technician, Student, Entrepreneur"
                value={data.occupation}
                onChange={(e) => update("occupation", e.target.value)}
              />

              <FormInput
                label="လုပ်ငန်းခွင်"
                placeholder="IT, Banking, Education, Healthcare"
                value={data.industry}
                onChange={(e) => update("industry", e.target.value)}
              />

              <div className="space-y-2">
                <span className="text-sm font-medium text-card-foreground">အချိန်ကာလ</span>
                <select
                  className="flex h-11 w-full rounded-lg border border-border bg-input px-3 py-2 text-sm text-card-foreground focus:border-ring focus:bg-input-focus focus:outline-none focus:ring-2 focus:ring-ring/20 transition-all duration-200"
                  value={data.timeline}
                  onChange={(e) => update("timeline", e.target.value)}
                >
                  <option value="">ရွေးချယ်ပါ</option>
                  {TIMELINE_OPTIONS.map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>

              <FormInput
                label="ဘတ်ဂျက်/ဆက်သွယ်ကြေး (ကျပ်/ဒေါ်လာ)"
                type="number"
                placeholder="အကန့်အသတ်ရှိပါက ထိုးထည့်ပါ"
                value={data.budget}
                onChange={(e) => update("budget", e.target.value)}
              />

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-card-foreground">အရေးပေါ်အဆင့်</span>
                  <span className="text-primary font-bold">{data.urgency}</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={5}
                  step={1}
                  className="w-full h-2 bg-input rounded-lg appearance-none cursor-pointer slider-thumb"
                  value={data.urgency}
                  onChange={(e) => update("urgency", Number(e.target.value))}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>အနည်း</span>
                  <span>အများ</span>
                </div>
              </div>

              <div className="md:col-span-2">
                <FormInput
                  label="ထပ်ဆောင်း ဖိုင်/လင့်ခ်"
                  placeholder="ဥပမာ - Google Drive/OneDrive link"
                  value={data.attachments}
                  onChange={(e) => update("attachments", e.target.value)}
                />
              </div>
            </div>
          </Section>

          {/* Privacy & Consent */}
          <Section title="Privacy & Consent" description="မှန်ကန်မှုအတွက် ထည့်သွင်းသည့် အချက်အလက်များကို ဗေဒင်ဖော်ပြရာတွင်သာ အသုံးပြုမည်">
            <div className="flex items-center gap-4 p-4 rounded-lg border border-border bg-card/30">
              <input
                type="checkbox"
                checked={data.consent}
                onChange={(e) => update("consent", e.target.checked)}
                className="rounded border-border text-primary focus:ring-primary scale-125"
              />
              <span className="text-sm text-card-foreground">
                အချက်အလက်များကို သဘောတူညီချက်ဖြင့် ပေးပို့ရန် သဘောတူပါသည်
              </span>
              <StatusBadge isRequired={required.consent} />
            </div>
          </Section>

          {/* Summary Section */}
          <Section 
            title="မော်ကွန်း/အကျဉ်းချုပ်" 
            variant="cosmic" 
            glow={true}
          >
            <div className="bg-background/80 backdrop-blur rounded-lg p-6 border border-border">
              <pre className="text-xs leading-relaxed text-card-foreground whitespace-pre-wrap font-mono">
                {formattedSummary}
              </pre>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <Button
                type="submit"
                variant="cosmic"
                size="lg"
                className="px-8"
              >
                ကော်ပီပြီး မေးမည်
              </Button>
              <Button
                type="button"
                onClick={downloadJSON}
                variant="secondary"
                size="lg"
              >
                JSON ဒေါင်းလုဒ်
              </Button>
              <Button
                type="button"
                onClick={resetForm}
                variant="outline"
                size="lg"
              >
                ပြန်လည်ဖျက်မယ်
              </Button>
            </div>

            {!allGood && (
              <div className="mt-4 p-4 rounded-lg bg-destructive/20 border border-destructive/30">
                <p className="text-sm text-destructive font-medium">
                  သတိပြုရန်: *လိုအပ်ချက်များ မပြည့်စုံသေးပါ*
                </p>
              </div>
            )}
          </Section>
        </form>

        <footer className="text-center text-muted-foreground pt-12 pb-8">
          <p className="text-sm">
            © {new Date().getFullYear()} Mystical Astrology Intake Helper — Burmese UI
          </p>
          <div className="mt-2 text-xs opacity-70">
            ✨ မေးခွန်းများကို လျှောက်လဲစွာ ဖြေဆိုပါ ✨
          </div>
        </footer>
      </main>
    </div>
  );
}