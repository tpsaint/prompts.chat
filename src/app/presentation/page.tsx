import {
  Blocks,
  Bot,
  BrainCircuit,
  CheckCircle2,
  CircleDotDashed,
  ClipboardCheck,
  Clock3,
  DatabaseZap,
  FileText,
  Filter,
  GitBranch,
  Layers3,
  Lightbulb,
  MessageSquareText,
  Network,
  PackageCheck,
  Puzzle,
  RefreshCw,
  Route,
  Scissors,
  ShieldCheck,
  Sparkles,
  Target,
  TimerReset,
  WandSparkles,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Image from "next/image";
import type { ReactNode } from "react";
import { SlideContent, SlideDeck, SlideHighlight, SlideTitle } from "@/components/presentation/SlideDeck";

export const metadata = {
  title: "Prompt Tasarımı ve Context Yönetimi | Presentation",
  description: "30 dakikalık Türkçe konuşma: prompt tasarımı, context yönetimi ve prompts.chat.",
};

const speakerNotes = [
  "Açılışta sunumun amacını netleştir: Bu konuşma prompt ezberlemek değil, bağlamı bilinçli yönetmek üzerine. 30 dakika sonunda herkesin kendi işine uygulayabileceği bir kontrol listesi olacak.",
  "Konuşmacı slaytı kısa tutulmalı. Kişisel hikaye: Awesome ChatGPT Prompts ile başlayan topluluk deneyimi, prompts.chat ile promptların paylaşılabilir, sürümlenebilir ve geliştirilebilir varlıklara dönüşmesi.",
  "Akışı anlat: önce zihinsel model, sonra promptun anatomisi, sonra context yönetimi ve ölçüm. prompts.chat bölümünü ürün demosu gibi değil, bu prensiplerin pratik karşılığı olarak konumlandır.",
  "Ana mesaj: Modeli sadece cevap makinesi gibi değil, sınırlı dikkat alanına sahip bir ekip arkadaşı gibi düşünün. Prompt tasarımı görevi tanımlar; context yönetimi modelin neye bakacağını seçer.",
  "Prompt tasarımının yalnızca güzel cümle yazmak olmadığını vurgula. Rol, hedef, veri, sınır, örnek ve çıktı sözleşmesi bir araya geldiğinde modelin çalışma alanı oluşur.",
  "Bu slaytta kötü prompt / iyi prompt farkını canlı okuyarak göster. İyi örneğin daha uzun olduğu için değil, karar yükünü azalttığı için iyi olduğunu söyle.",
  "Context penceresini dosya dolabı değil, toplantı masası metaforu ile anlat. Masaya her şeyi koymak odak kaybettirir; doğru şeyleri doğru sırayla koymak performansı artırır.",
  "Bağlam katmanlarını sırayla açıkla. Sistem ve geliştirici talimatlarının politikayı, kullanıcı mesajının amacı, araç sonuçlarının kanıtı, geçmişin ise sürekliliği taşıdığını anlat.",
  "Önemli ayrım: Context çokluğu kalite demek değildir. Gürültü, eski kararlar ve çelişkili talimatlar modeli kararsızlaştırır. Context tasarrufu aynı zamanda kalite kontrolüdür.",
  "Kısa bir teknik çerçeve ver: seç, sırala, sıkıştır, doğrula. Bu dört fiil context yönetiminin günlük pratiği olabilir.",
  "Örnekler model davranışını güçlü biçimde kilitler. Ancak yanlış örnekler de yanlış davranışı kilitler. Örnekleri az ama temsil gücü yüksek seçmek gerektiğini vurgula.",
  "Çıktı sözleşmesi özellikle ekiplerde önemlidir. JSON, tablo, diff, adım adım plan gibi formatlar otomasyon ve tekrar üretilebilirlik sağlar.",
  "Araç kullanan ajanlarda prompt, sadece cevap formatını değil yetki sınırını da belirler. Ne zaman arama yapmalı, ne zaman sormalı, ne zaman durmalı gibi kararları açık yazın.",
  "Context yönetiminin operasyonel tarafı: uzun konuşmalarda özet, dosya tabanlı işlerde ilgili parçalar, arama tabanlı işlerde kaynak ve alıntı. Her şeyi tek mesaja doldurmak yerine akış tasarla.",
  "Hata modlarını örneklerle anlat: belirsiz hedef, eski bağlam, çelişki, görünmez varsayım, format eksikliği. Bunlar model hatası gibi görünür ama çoğu zaman tasarım hatasıdır.",
  "Ölçüm slaytında küçük bir test setinin değerini anlat. Aynı promptu birkaç gerçek senaryo ile denemek, tek seferlik iyi cevaptan daha güvenilirdir.",
  "prompts.chat'i bağlamla ilişkilendir: iyi promptlar tek kişide kalmamalı. Paylaşım, sürümleme ve geri bildirim prompt kalitesini artırır.",
  "Ekip pratiğine geç: promptlar kod gibi yaşamalı. Sahiplik, değişiklik geçmişi, review ve örnek çıktılar promptun güvenilirliğini artırır.",
  "Kapanış kontrol listesini yavaş oku. Dinleyicilerin kendi promptlarını bu beş soruyla gözden geçirmesini iste.",
  "Son slaytta tek cümlelik kapanış: İyi prompt, modele ne yapacağını söyler; iyi context yönetimi, neye dayanarak yapacağını belirler.",
];

type CardProps = {
  icon: LucideIcon;
  title: string;
  children: ReactNode;
  accent?: string;
};

function Card({ icon: Icon, title, children, accent = "text-primary" }: CardProps) {
  return (
    <div className="rounded-3xl border border-border/70 bg-background/70 p-6 shadow-sm backdrop-blur transition-transform duration-300 hover:-translate-y-1">
      <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 ${accent}`}>
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="mb-2 text-2xl font-bold text-foreground">{title}</h3>
      <p className="text-lg leading-relaxed text-muted-foreground">{children}</p>
    </div>
  );
}

function Pill({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-base font-semibold text-primary">
      {children}
    </span>
  );
}

function CodePanel({ children, title = "prompt.md" }: { children: ReactNode; title?: string }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-border bg-zinc-950 text-zinc-100 shadow-2xl">
      <div className="flex items-center justify-between border-b border-white/10 bg-white/5 px-5 py-3">
        <div className="flex gap-2">
          <span className="h-3 w-3 rounded-full bg-red-400" />
          <span className="h-3 w-3 rounded-full bg-yellow-400" />
          <span className="h-3 w-3 rounded-full bg-green-400" />
        </div>
        <span className="font-mono text-xs text-zinc-400">{title}</span>
      </div>
      <pre className="whitespace-pre-wrap p-6 font-mono text-sm leading-relaxed md:text-base">{children}</pre>
    </div>
  );
}

function FlowStep({ icon: Icon, title, text }: { icon: LucideIcon; title: string; text: string }) {
  return (
    <div className="relative rounded-3xl border border-border/70 bg-background/75 p-5 shadow-sm">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="text-2xl font-bold">{title}</h3>
      <p className="mt-2 text-lg leading-relaxed text-muted-foreground">{text}</p>
    </div>
  );
}

function ContextLayer({ label, description, tone }: { label: string; description: string; tone: string }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-border bg-background/75 p-4 shadow-sm">
      <div className={`h-14 w-2 rounded-full ${tone}`} />
      <div>
        <h3 className="text-xl font-bold">{label}</h3>
        <p className="text-base text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

function MiniChecklist({ items }: { items: string[] }) {
  return (
    <div className="grid gap-3">
      {items.map((item) => (
        <div key={item} className="flex items-start gap-3 rounded-2xl border border-border/70 bg-background/70 p-4 text-xl font-semibold">
          <CheckCircle2 className="mt-1 h-6 w-6 flex-none text-primary" />
          <span>{item}</span>
        </div>
      ))}
    </div>
  );
}

export default function PresentationPage() {
  return (
    <SlideDeck notes={speakerNotes}>
      <div className="flex min-h-[70vh] flex-col items-center justify-center text-center">
        <div className="mb-8 flex h-24 w-24 rotate-6 items-center justify-center rounded-[2rem] bg-primary/10 text-primary shadow-xl shadow-primary/10">
          <WandSparkles className="h-12 w-12" />
        </div>
        <SlideTitle className="max-w-5xl">Prompt Tasarımı ve Context Yönetimi</SlideTitle>
        <SlideContent className="mx-auto max-w-3xl">
          30 dakikalık pratik bir çerçeve: daha iyi talimat, daha temiz bağlam, daha güvenilir AI çıktısı.
        </SlideContent>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Pill>prompts.chat/presentation</Pill>
          <Pill>Ok tuşları, boşluk, F, N</Pill>
        </div>
      </div>

      <div className="grid min-h-[70vh] items-center gap-8 lg:grid-cols-[1fr_0.95fr]">
        <div className="relative order-2 lg:order-1">
          <div className="absolute -left-8 top-10 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
          <div className="relative mx-auto w-full max-w-[34rem]">
            <div className="absolute -inset-4 -rotate-3 rounded-[3rem] bg-gradient-to-br from-primary/30 via-primary/10 to-transparent" />
            <div className="relative overflow-hidden rounded-[3rem] border border-border bg-background shadow-2xl">
              <Image
                src="https://github.com/f.png"
                alt="Fatih Kadir Akın profil fotoğrafı"
                width={900}
                height={900}
                priority
                unoptimized
                className="aspect-square w-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/45 to-transparent p-8 text-white">
                <p className="text-sm font-bold uppercase tracking-[0.35em] text-white/70">Konuşmacı</p>
                <h2 className="mt-2 text-5xl font-black tracking-tight">Fatih Kadir Akın</h2>
                <p className="mt-3 max-w-md text-lg font-semibold leading-snug text-white/85">
                  WordPress Developer Advocate, Automattic - Creator of prompts.chat
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="order-1 lg:order-2">
          <SlideTitle className="mb-5">Merhaba, ben Fatih.</SlideTitle>
          <SlideContent className="max-w-2xl">
            Geliştiricilerin hayatını kolaylaştıran uygulamalar geliştiriyorum; bunlardan biri de{" "}
            <SlideHighlight>prompts.chat</SlideHighlight>.
          </SlideContent>
          <div className="mt-10 flex flex-wrap items-center gap-5">
            <div className="flex items-center gap-3 rounded-2xl border border-border/70 bg-background/75 px-5 py-4 shadow-sm backdrop-blur">
              <Image
                src="https://cdn.simpleicons.org/wordpress/21759B"
                alt="WordPress"
                width={40}
                height={40}
                unoptimized
                className="h-10 w-10"
              />
              <span className="text-xl font-bold text-foreground">WordPress</span>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-border/70 bg-background/75 px-5 py-4 shadow-sm backdrop-blur">
              <Image
                src="https://cdn.simpleicons.org/automattic/000000"
                alt="Automattic"
                width={40}
                height={40}
                unoptimized
                className="h-10 w-10 dark:invert"
              />
              <span className="text-xl font-bold text-foreground">Automattic</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex min-h-[70vh] flex-col justify-center">
        <SlideTitle>Bugünkü rota</SlideTitle>
        <div className="grid gap-5 md:grid-cols-2">
          <FlowStep icon={BrainCircuit} title="Zihinsel model" text="Modelin neyi, ne sırayla ve hangi amaçla görmesi gerektiğini düşünmek." />
          <FlowStep icon={MessageSquareText} title="Prompt anatomisi" text="Rol, hedef, bağlam, kısıtlar, örnekler ve çıktı sözleşmesi." />
          <FlowStep icon={Layers3} title="Context yönetimi" text="Sınırlı dikkat alanını seçmek, sıralamak, sıkıştırmak ve temizlemek." />
          <FlowStep icon={ClipboardCheck} title="Ölçüm ve paylaşım" text="Promptu tek seferlik cümle değil, iyileştirilebilir artefact yapmak." />
        </div>
      </div>

      <div className="flex min-h-[70vh] flex-col justify-center">
        <SlideTitle>AI ile çalışmak: çok zeki ama bağlama bağımlı bir ekip arkadaşı</SlideTitle>
        <div className="grid gap-6 md:grid-cols-3">
          <Card icon={Target} title="Amaç net olmalı">
            Modelin optimizasyon hedefi belirsizse cevap da belirsizleşir.
          </Card>
          <Card icon={ShieldCheck} title="Sınırlar görünür olmalı">
            Ne yapılmayacağı, ne yapılacağı kadar önemlidir.
          </Card>
          <Card icon={DatabaseZap} title="Kanıt seçilmeli">
            Model en son ve en belirgin bağlama fazla ağırlık verir.
          </Card>
        </div>
        <SlideContent className="mt-10 max-w-4xl">
          İyi prompt <SlideHighlight>ne yapılacağını</SlideHighlight>, iyi context yönetimi ise{" "}
          <SlideHighlight>neye dayanarak yapılacağını</SlideHighlight> belirler.
        </SlideContent>
      </div>

      <div className="grid min-h-[70vh] items-center gap-8 lg:grid-cols-2">
        <div>
          <SlideTitle>Prompt tasarımı cümle süslemek değildir</SlideTitle>
          <SlideContent>
            Prompt, modelle aranızdaki <SlideHighlight>çalışma sözleşmesidir</SlideHighlight>.
            Cevabın amacı, kapsamı, kaynakları, formatı ve kalite barı bu sözleşmede yer alır.
          </SlideContent>
        </div>
        <div className="grid gap-4">
          {[
            ["Rol", "Hangi perspektiften düşünecek?"],
            ["Görev", "Tam olarak neyi üretecek?"],
            ["Bağlam", "Hangi bilgiye dayanacak?"],
            ["Kısıt", "Neyi yapmayacak veya aşmayacak?"],
            ["Çıktı", "Nasıl teslim edecek?"],
          ].map(([label, text]) => (
            <div key={label} className="flex items-center gap-4 rounded-2xl border border-border bg-background/75 p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 font-black text-primary">{label[0]}</div>
              <div>
                <h3 className="text-xl font-bold">{label}</h3>
                <p className="text-muted-foreground">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid min-h-[70vh] items-center gap-8 lg:grid-cols-2">
        <div>
          <SlideTitle>Kötü prompt / iyi prompt</SlideTitle>
          <SlideContent>
            Uzun olan değil, <SlideHighlight>karar yükünü azaltan</SlideHighlight> prompt daha iyidir.
          </SlideContent>
        </div>
        <div className="space-y-5">
          <CodePanel title="belirsiz.prompt">
            {`Bana context management hakkında iyi bir yazı yaz.`}
          </CodePanel>
          <CodePanel title="tasarlanmis.prompt">
            {`Rol: Kıdemli AI ürün danışmanı.
Amaç: Teknik olmayan ürün ekibine context management anlat.
Bağlam: 30 dakikalık şirket içi eğitim.
Kısıt: Jargon kullanma, 3 örnek ver, riskleri belirt.
Çıktı: Başlık, 5 maddelik özet, uygulanabilir kontrol listesi.`}
          </CodePanel>
        </div>
      </div>

      <div className="flex min-h-[70vh] flex-col justify-center">
        <SlideTitle>Context penceresi dosya dolabı değil, toplantı masasıdır</SlideTitle>
        <SlideContent className="max-w-5xl">
          Masaya her şeyi koyarsanız ekip odaklanamaz. Doğru belgeleri, doğru sırayla, doğru ayrıntı seviyesinde getirirsiniz.
        </SlideContent>
        <div className="mt-10 grid gap-5 md:grid-cols-4">
          <FlowStep icon={Filter} title="Seç" text="İlgili olanı ayır." />
          <FlowStep icon={Route} title="Sırala" text="Önceliği görünür yap." />
          <FlowStep icon={Scissors} title="Sıkıştır" text="Gürültüyü azalt." />
          <FlowStep icon={CheckCircle2} title="Doğrula" text="Kaynak ve sonucu kontrol et." />
        </div>
      </div>

      <div className="grid min-h-[70vh] items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <SlideTitle>Bağlam katmanları</SlideTitle>
          <SlideContent>
            Model tek bir metni değil, üst üste binmiş talimat ve kanıt katmanlarını yorumlar.
          </SlideContent>
        </div>
        <div className="grid gap-3">
          <ContextLayer label="Sistem" description="Kimlik, güvenlik ve en üst kurallar." tone="bg-red-500" />
          <ContextLayer label="Geliştirici" description="Uygulama davranışı, araç kullanımı, format kuralları." tone="bg-orange-500" />
          <ContextLayer label="Kullanıcı" description="Anlık amaç, ihtiyaç ve başarı tanımı." tone="bg-primary" />
          <ContextLayer label="Araç sonuçları" description="Arama, dosya, API veya veritabanından gelen kanıt." tone="bg-emerald-500" />
          <ContextLayer label="Geçmiş" description="Konuşma sürekliliği ve önceki kararlar." tone="bg-sky-500" />
        </div>
      </div>

      <div className="flex min-h-[70vh] flex-col justify-center">
        <SlideTitle>Daha fazla context her zaman daha iyi değildir</SlideTitle>
        <div className="grid gap-6 md:grid-cols-3">
          <Card icon={CircleDotDashed} title="Gürültü" accent="text-orange-500">
            Alakasız detaylar, önemli sinyali gömer.
          </Card>
          <Card icon={RefreshCw} title="Eski kararlar" accent="text-sky-500">
            Geçmişte doğru olan bilgi bugün yanlış olabilir.
          </Card>
          <Card icon={Puzzle} title="Çelişkiler" accent="text-red-500">
            Model hangi talimata uyacağını tahmin etmek zorunda kalır.
          </Card>
        </div>
        <SlideContent className="mt-10">
          Context yönetimi, token tasarrufu değil; <SlideHighlight>dikkat yönetimidir</SlideHighlight>.
        </SlideContent>
      </div>

      <div className="flex min-h-[70vh] flex-col justify-center">
        <SlideTitle>Pratik yöntem: seç, sırala, sıkıştır, doğrula</SlideTitle>
        <div className="grid gap-5 lg:grid-cols-4">
          <FlowStep icon={Filter} title="Seç" text="Bu görev için gerçekten gerekli bilgi ne?" />
          <FlowStep icon={Layers3} title="Sırala" text="En önemli talimat ve kanıt en görünür yerde mi?" />
          <FlowStep icon={Scissors} title="Sıkıştır" text="Tekrar, sohbet gürültüsü ve eski kararlar temizlendi mi?" />
          <FlowStep icon={ClipboardCheck} title="Doğrula" text="Cevap kaynak, format ve başarı kriteriyle uyuşuyor mu?" />
        </div>
      </div>

      <div className="grid min-h-[70vh] items-center gap-10 lg:grid-cols-2">
        <div>
          <SlideTitle>Örnekler davranışı kilitler</SlideTitle>
          <SlideContent>
            Few-shot örnekler modele sadece formatı değil, <SlideHighlight>neyi iyi saydığınızı</SlideHighlight> gösterir.
          </SlideContent>
        </div>
        <div className="rounded-3xl border border-border bg-background/75 p-6 shadow-sm">
          <div className="mb-6 flex items-center gap-3">
            <Lightbulb className="h-7 w-7 text-yellow-500" />
            <h3 className="text-2xl font-bold">Örnek seçerken</h3>
          </div>
          <MiniChecklist
            items={[
              "Gerçek kullanım senaryosuna benziyor mu?",
              "Başarılı ve başarısız örnek ayrımı var mı?",
              "Format, ton ve ayrıntı seviyesi temsil ediliyor mu?",
              "Yanlış genelleme yaratacak özel durum var mı?",
            ]}
          />
        </div>
      </div>

      <div className="grid min-h-[70vh] items-center gap-8 lg:grid-cols-2">
        <div>
          <SlideTitle>Çıktı sözleşmesi otomasyonun kapısıdır</SlideTitle>
          <SlideContent>
            İnsan okuyacaksa okunabilirlik, sistem okuyacaksa <SlideHighlight>şema</SlideHighlight> önemlidir.
          </SlideContent>
        </div>
        <CodePanel title="output-contract.json">
          {`{
  "summary": "en fazla 3 cümle",
  "risks": ["kanıta dayalı risk listesi"],
  "next_actions": [
    { "owner": "rol", "task": "yapılacak iş", "priority": "P0 | P1 | P2" }
  ],
  "confidence": "low | medium | high"
}`}
        </CodePanel>
      </div>

      <div className="flex min-h-[70vh] flex-col justify-center">
        <SlideTitle>Ajanlarda prompt = yetki ve durma kuralları</SlideTitle>
        <div className="grid gap-6 md:grid-cols-3">
          <Card icon={Bot} title="Ne zaman araç?" accent="text-sky-500">
            Bilgi eksikse arama yap; tahminle doldurma.
          </Card>
          <Card icon={ShieldCheck} title="Ne zaman sormalı?" accent="text-emerald-500">
            Kapsam veya risk davranışı etkiliyorsa kullanıcıya dön.
          </Card>
          <Card icon={TimerReset} title="Ne zaman durmalı?" accent="text-purple-500">
            Başarı kriteri tamamlandıysa yeni iş icat etme.
          </Card>
        </div>
      </div>

      <div className="grid min-h-[70vh] items-center gap-8 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <SlideTitle>Uzun işlerde context akışı tasarla</SlideTitle>
          <SlideContent>
            Tek dev prompt yerine, işi aşamalara böl: keşif, plan, uygulama, doğrulama, özet.
          </SlideContent>
        </div>
        <div className="grid gap-4">
          {[
            { icon: Network, title: "Keşif", text: "Dosya, kaynak ve kısıtları topla." },
            { icon: Route, title: "Plan", text: "Kararları ve bağımlılıkları görünür yap." },
            { icon: Blocks, title: "Uygulama", text: "Sadece gerekli bağlamı sonraki adıma taşı." },
            { icon: ClipboardCheck, title: "Doğrulama", text: "Çıktıyı ölçüt ve kaynakla kontrol et." },
          ].map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex items-center gap-4 rounded-2xl border border-border bg-background/75 p-4 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold">{title}</h3>
                <p className="text-muted-foreground">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex min-h-[70vh] flex-col justify-center">
        <SlideTitle>En sık görülen hata modları</SlideTitle>
        <div className="grid gap-5 md:grid-cols-2">
          <FlowStep icon={Target} title="Belirsiz hedef" text="Başarı tanımı yoksa model kendi hedefini seçer." />
          <FlowStep icon={Clock3} title="Eski context" text="Önceki kararlar yeni talimatla çakışır." />
          <FlowStep icon={Puzzle} title="Görünmez varsayım" text="Sizde açık olan bilgi modelde yoktur." />
          <FlowStep icon={FileText} title="Format eksikliği" text="Doğru bilgi yanlış biçimde gelirse kullanılamaz." />
        </div>
      </div>

      <div className="grid min-h-[70vh] items-center gap-10 lg:grid-cols-2">
        <div>
          <SlideTitle>Promptları ölç: tek iyi cevap yetmez</SlideTitle>
          <SlideContent>
            Küçük bir test seti, promptun gerçek hayatta dayanıklı olup olmadığını gösterir.
          </SlideContent>
        </div>
        <div className="rounded-3xl border border-border bg-background/75 p-6 shadow-sm">
          <MiniChecklist
            items={[
              "3 normal senaryo",
              "2 sınır durum",
              "1 kasıtlı belirsiz istek",
              "Beklenen format kontrolü",
              "İyi cevap nasıl görünür? kısa kontrol listesi",
            ]}
          />
        </div>
      </div>

      <div className="grid min-h-[70vh] items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <SlideTitle>prompts.chat: promptları paylaşılabilir hale getirmek</SlideTitle>
          <SlideContent>
            Promptlar kaybolan sohbet parçaları olmamalı. Keşfedilebilir, fork edilebilir, iyileştirilebilir ve tekrar kullanılabilir olmalı.
          </SlideContent>
        </div>
        <div className="grid gap-4">
          <Card icon={Sparkles} title="Keşif">
            İyi örneği arayıp bulmak, sıfırdan başlamaktan hızlıdır.
          </Card>
          <Card icon={GitBranch} title="Değişiklik">
            Promptlar review ve geri bildirimle olgunlaşır.
          </Card>
          <Card icon={PackageCheck} title="Yeniden kullanım">
            Aynı kaliteyi farklı ekip ve iş akışlarına taşırsınız.
          </Card>
        </div>
      </div>

      <div className="flex min-h-[70vh] flex-col justify-center">
        <SlideTitle>Promptlar kod gibi yaşamalı</SlideTitle>
        <div className="grid gap-5 md:grid-cols-4">
          <FlowStep icon={FileText} title="Sahiplik" text="Kim güncelliyor?" />
          <FlowStep icon={GitBranch} title="Sürüm" text="Ne değişti?" />
          <FlowStep icon={ClipboardCheck} title="Review" text="Kalite barı ne?" />
          <FlowStep icon={DatabaseZap} title="Örnek" text="Hangi veriyle çalıştı?" />
        </div>
      </div>

      <div className="grid min-h-[70vh] items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <SlideTitle>Kapanış kontrol listesi</SlideTitle>
          <SlideContent>
            Bir sonraki promptunuzu göndermeden önce bu beş soruyu sorun.
          </SlideContent>
        </div>
        <MiniChecklist
          items={[
            "Modelin rolü ve hedefi net mi?",
            "Gerekli context seçildi ve sıralandı mı?",
            "Kısıtlar ve durma kuralları yazıldı mı?",
            "Çıktı formatı sözleşmeye bağlandı mı?",
            "En az birkaç gerçek senaryoyla denendi mi?",
          ]}
        />
      </div>

      <div className="flex min-h-[70vh] flex-col items-center justify-center text-center">
        <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Sparkles className="h-12 w-12" />
        </div>
        <SlideTitle>Teşekkürler</SlideTitle>
        <SlideContent className="mx-auto max-w-4xl">
          İyi prompt modele <SlideHighlight>ne yapacağını</SlideHighlight> söyler.
          <br />
          İyi context yönetimi <SlideHighlight>neye dayanarak yapacağını</SlideHighlight> belirler.
        </SlideContent>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Pill>prompts.chat</Pill>
          <Pill>Q&A</Pill>
        </div>
      </div>
    </SlideDeck>
  );
}
