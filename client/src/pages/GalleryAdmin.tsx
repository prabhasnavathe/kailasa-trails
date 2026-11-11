import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { trpc } from "@/lib/trpc";
import {
  Check,
  Image as ImageIcon,
  Loader2,
  Trash2,
  X,
  Lock,
  Unlock,
  ShieldCheck,
  Eye,
  EyeOff,
  ExternalLink,
  RefreshCw,
  LogOut,
  Mountain,
  ZoomIn,
  Mail,
  Phone,
  ArrowLeft,
  Calendar,
  Sparkles,
} from "lucide-react";
import { useState, useMemo } from "react";
import { Link } from "wouter";
import { toast } from "sonner";

export default function GalleryAdmin() {
  const [passcode, setPasscode] = useState("");
  const [showPasscode, setShowPasscode] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<{
    url: string;
    title: string;
    subtitle?: string;
  } | null>(null);
  const [activeTab, setActiveTab] = useState<"pending" | "approved" | "rejected" | "all">("pending");
  const [searchQuery, setSearchQuery] = useState("");

  const utils = trpc.useUtils();
  const { data: authStatus, isLoading: isAuthLoading } = trpc.admin.checkAuth.useQuery();

  const [localToken, setLocalToken] = useState(() => {
    try {
      return localStorage.getItem("kailasa_admin_token");
    } catch {
      return null;
    }
  });

  const isAuthenticated = authStatus?.isAuthenticated || localToken === "kailasa_admin_authenticated";

  const { data: submissions, isLoading, refetch } = trpc.admin.listSubmissions.useQuery(
    undefined,
    {
      enabled: isAuthenticated,
    }
  );

  const login = trpc.admin.login.useMutation({
    onSuccess: (data) => {
      try {
        localStorage.setItem("kailasa_admin_token", data.token);
        setLocalToken(data.token);
      } catch {}
      utils.admin.checkAuth.invalidate();
      utils.admin.listSubmissions.invalidate();
      toast.success("Welcome back! Admin review station unlocked.");
    },
    onError: (err) => {
      toast.error(err.message || "Invalid admin passcode");
    },
  });

  const logout = trpc.admin.logout.useMutation({
    onSuccess: () => {
      try {
        localStorage.removeItem("kailasa_admin_token");
        setLocalToken(null);
      } catch {}
      utils.admin.checkAuth.invalidate();
      toast.info("Logged out of admin review station.");
    },
  });

  const approve = trpc.admin.approve.useMutation({
    onSuccess: () => {
      utils.admin.listSubmissions.invalidate();
      utils.gallery.listApproved.invalidate();
      toast.success("Approved! Photo and story are now live in the Trekkers' Gallery.");
    },
    onError: (err) => toast.error(err.message),
  });

  const reject = trpc.admin.reject.useMutation({
    onSuccess: () => {
      utils.admin.listSubmissions.invalidate();
      utils.gallery.listApproved.invalidate();
      toast.info("Submission marked as rejected.");
    },
    onError: (err) => toast.error(err.message),
  });

  const remove = trpc.admin.deleteSubmission.useMutation({
    onSuccess: () => {
      utils.admin.listSubmissions.invalidate();
      utils.gallery.listApproved.invalidate();
      toast.success("Submission permanently deleted.");
    },
    onError: (err) => toast.error(err.message),
  });

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passcode.trim()) {
      toast.error("Please enter the admin passcode");
      return;
    }
    login.mutate({ passcode: passcode.trim() });
  };

  const pendingList = useMemo(
    () => (submissions ?? []).filter((s) => s.status === "pending"),
    [submissions]
  );
  const approvedList = useMemo(
    () => (submissions ?? []).filter((s) => s.status === "approved"),
    [submissions]
  );
  const rejectedList = useMemo(
    () => (submissions ?? []).filter((s) => s.status === "rejected"),
    [submissions]
  );

  const filteredList = useMemo(() => {
    let list = submissions ?? [];
    if (activeTab === "pending") list = pendingList;
    else if (activeTab === "approved") list = approvedList;
    else if (activeTab === "rejected") list = rejectedList;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.email.toLowerCase().includes(q) ||
          (s.trek && s.trek.toLowerCase().includes(q)) ||
          (s.story && s.story.toLowerCase().includes(q))
      );
    }
    return list;
  }, [submissions, activeTab, pendingList, approvedList, rejectedList, searchQuery]);

  // 1. Unauthenticated Login Gate
  if (!isAuthenticated && !isAuthLoading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
        {/* Subtle Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="w-full max-w-md relative z-10">
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-3 mb-4 group">
              <img
                src="/manus-storage/kailasa-logo-transparent.png"
                alt="Kailasa Trails"
                className="h-16 w-auto object-contain mx-auto"
              />
            </Link>
            <h1 className="text-2xl font-bold tracking-tight text-white mb-2">
              Kailasa Trails Admin
            </h1>
            <p className="text-sm text-white/60">
              Gallery & Trekker Experience Review Station
            </p>
          </div>

          <Card className="bg-slate-900/90 border-white/10 shadow-2xl backdrop-blur-xl">
            <CardHeader className="text-center pb-4">
              <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mx-auto mb-2">
                <Lock className="w-5 h-5" />
              </div>
              <CardTitle className="text-xl text-white">Admin Authentication</CardTitle>
              <CardDescription className="text-white/60 text-xs">
                Enter your administrative passcode to review, approve, or reject trekker photos for the public gallery.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-white/80 mb-2">
                    Admin Passcode
                  </label>
                  <div className="relative">
                    <Input
                      type={showPasscode ? "text" : "password"}
                      placeholder="Enter passcode"
                      value={passcode}
                      onChange={(e) => setPasscode(e.target.value)}
                      className="bg-slate-800 border-white/15 text-white pr-10 focus:border-amber-400"
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={() => setShowPasscode(!showPasscode)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
                    >
                      {showPasscode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  <p className="text-[11px] text-white/40 mt-1.5 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 inline" />
                    Default Passcode: <code className="text-amber-300 font-mono">kailasa2026</code>
                  </p>
                </div>

                <Button
                  type="submit"
                  disabled={login.isPending}
                  className="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold py-3 shadow-lg shadow-amber-500/20"
                >
                  {login.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Verifying...
                    </>
                  ) : (
                    <>
                      <Unlock className="w-4 h-4 mr-2" /> Unlock Review Station
                    </>
                  )}
                </Button>
              </form>

              <div className="mt-6 pt-4 border-t border-white/10 text-center">
                <Link
                  href="/"
                  className="text-xs text-white/60 hover:text-white inline-flex items-center gap-1.5 transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back to Main Site
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // 2. Authenticated Admin Dashboard
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-white/10 shadow-md">
        <div className="container max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2.5">
              <img
                src="/manus-storage/kailasa-logo-transparent.png"
                alt="Kailasa Trails"
                className="h-10 w-auto object-contain"
              />
              <span className="font-bold tracking-wide text-white text-base">
                KAILASA TRAILS
              </span>
            </Link>
            <span className="text-white/20">|</span>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" /> Admin Review Station
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/#gallery"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" /> View Live Gallery
            </Link>
            <Button
              size="sm"
              variant="outline"
              onClick={() => refetch()}
              className="border-white/15 text-white hover:bg-white/10 text-xs gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Refresh
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => logout.mutate()}
              className="text-white/60 hover:text-white hover:bg-white/10 text-xs gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" /> Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container max-w-7xl mx-auto px-4 py-8">
        {/* Header Title & Description */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-white mb-2 flex items-center gap-3">
            <Mountain className="w-8 h-8 text-amber-400" />
            Trekker Experience & Photo Moderation
          </h1>
          <p className="text-white/70 text-sm max-w-2xl">
            Review submissions sent via the "Share Your Experience" box. When you click{" "}
            <span className="text-emerald-400 font-semibold">Approve</span>, the photo and story immediately publish to the live Trekkers' Gallery on the homepage.
          </p>
        </div>

        {/* KPI Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div
            onClick={() => setActiveTab("pending")}
            className={`p-5 rounded-2xl border transition-all cursor-pointer ${
              activeTab === "pending"
                ? "bg-amber-500/15 border-amber-400 shadow-lg shadow-amber-500/10"
                : "bg-slate-900 border-white/10 hover:border-white/20"
            }`}
          >
            <p className="text-xs text-amber-300 font-semibold uppercase tracking-wider mb-1">
              Pending Review
            </p>
            <p className="text-3xl font-black text-amber-400">{pendingList.length}</p>
            <p className="text-[11px] text-white/50 mt-1">Awaiting approval</p>
          </div>

          <div
            onClick={() => setActiveTab("approved")}
            className={`p-5 rounded-2xl border transition-all cursor-pointer ${
              activeTab === "approved"
                ? "bg-emerald-500/15 border-emerald-400 shadow-lg shadow-emerald-500/10"
                : "bg-slate-900 border-white/10 hover:border-white/20"
            }`}
          >
            <p className="text-xs text-emerald-300 font-semibold uppercase tracking-wider mb-1">
              Live in Gallery
            </p>
            <p className="text-3xl font-black text-emerald-400">{approvedList.length}</p>
            <p className="text-[11px] text-white/50 mt-1">Approved & published</p>
          </div>

          <div
            onClick={() => setActiveTab("rejected")}
            className={`p-5 rounded-2xl border transition-all cursor-pointer ${
              activeTab === "rejected"
                ? "bg-rose-500/15 border-rose-400 shadow-lg shadow-rose-500/10"
                : "bg-slate-900 border-white/10 hover:border-white/20"
            }`}
          >
            <p className="text-xs text-rose-300 font-semibold uppercase tracking-wider mb-1">
              Rejected
            </p>
            <p className="text-3xl font-black text-rose-400">{rejectedList.length}</p>
            <p className="text-[11px] text-white/50 mt-1">Hidden from gallery</p>
          </div>

          <div
            onClick={() => setActiveTab("all")}
            className={`p-5 rounded-2xl border transition-all cursor-pointer ${
              activeTab === "all"
                ? "bg-cyan-500/15 border-cyan-400 shadow-lg shadow-cyan-500/10"
                : "bg-slate-900 border-white/10 hover:border-white/20"
            }`}
          >
            <p className="text-xs text-cyan-300 font-semibold uppercase tracking-wider mb-1">
              Total Submissions
            </p>
            <p className="text-3xl font-black text-cyan-400">
              {submissions?.length ?? 0}
            </p>
            <p className="text-[11px] text-white/50 mt-1">All time</p>
          </div>
        </div>

        {/* Filter Controls & Search */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 pb-4 border-b border-white/10">
          {/* Tab Buttons */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-white/10 w-full sm:w-auto">
            <button
              onClick={() => setActiveTab("pending")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === "pending"
                  ? "bg-amber-400 text-black shadow-sm"
                  : "text-white/70 hover:text-white"
              }`}
            >
              Pending ({pendingList.length})
            </button>
            <button
              onClick={() => setActiveTab("approved")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === "approved"
                  ? "bg-emerald-500 text-white shadow-sm"
                  : "text-white/70 hover:text-white"
              }`}
            >
              Approved ({approvedList.length})
            </button>
            <button
              onClick={() => setActiveTab("rejected")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === "rejected"
                  ? "bg-rose-500 text-white shadow-sm"
                  : "text-white/70 hover:text-white"
              }`}
            >
              Rejected ({rejectedList.length})
            </button>
            <button
              onClick={() => setActiveTab("all")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === "all"
                  ? "bg-white text-black shadow-sm"
                  : "text-white/70 hover:text-white"
              }`}
            >
              All ({submissions?.length ?? 0})
            </button>
          </div>

          {/* Search Box */}
          <div className="w-full sm:w-72">
            <Input
              type="text"
              placeholder="Search by trekker name, trek, email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-slate-900 border-white/15 text-xs text-white placeholder:text-white/40"
            />
          </div>
        </div>

        {/* Submissions List */}
        {isLoading ? (
          <div className="py-24 text-center">
            <Loader2 className="w-8 h-8 animate-spin text-amber-400 mx-auto mb-3" />
            <p className="text-white/60 text-sm">Loading submissions...</p>
          </div>
        ) : filteredList.length === 0 ? (
          <div className="py-20 px-6 rounded-3xl bg-slate-900 border border-white/10 text-center max-w-lg mx-auto">
            <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4 text-white/40">
              <ImageIcon className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">No Submissions Found</h3>
            <p className="text-sm text-white/60 mb-6">
              {activeTab === "pending"
                ? "All pending trekker submissions have been reviewed! New submissions from the 'Share Your Experience' form will appear here."
                : `No submissions in the ${activeTab} category.`}
            </p>
            <Link href="/#share-experience">
              <Button size="sm" variant="outline" className="border-white/20 text-white text-xs">
                Test 'Share Experience' Form
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredList.map((sub) => (
              <div
                key={sub.id}
                className="bg-slate-900/90 border border-white/10 rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between"
              >
                {/* Top section: Photo + Info */}
                <div>
                  {sub.photoUrl ? (
                    <div
                      className="relative h-56 w-full bg-black/40 overflow-hidden cursor-pointer group"
                      onClick={() =>
                        setSelectedPhoto({
                          url: sub.photoUrl!,
                          title: `${sub.name}'s Experience`,
                          subtitle: sub.trek ?? "Trekker Photo",
                        })
                      }
                    >
                      <img
                        src={sub.photoUrl}
                        alt={`${sub.name}'s submission`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/30 pointer-events-none" />
                      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-black/70 p-2 rounded-full text-white backdrop-blur-sm">
                        <ZoomIn className="w-4 h-4" />
                      </div>
                      <div className="absolute top-3 left-3">
                        <Badge
                          className={
                            sub.status === "approved"
                              ? "bg-emerald-500 text-white border-none font-bold"
                              : sub.status === "rejected"
                              ? "bg-rose-500 text-white border-none font-bold"
                              : "bg-amber-400 text-black border-none font-bold shadow-md"
                          }
                        >
                          {sub.status === "approved"
                            ? "✓ Live in Gallery"
                            : sub.status === "rejected"
                            ? "Rejected"
                            : "Pending Approval"}
                        </Badge>
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 bg-slate-950/50 border-b border-white/5 flex items-center justify-between">
                      <span className="text-xs text-white/50 flex items-center gap-1.5">
                        <ImageIcon className="w-4 h-4" /> Story without photo
                      </span>
                      <Badge
                        className={
                          sub.status === "approved"
                            ? "bg-emerald-500 text-white border-none font-bold"
                            : sub.status === "rejected"
                            ? "bg-rose-500 text-white border-none font-bold"
                            : "bg-amber-400 text-black border-none font-bold"
                        }
                      >
                        {sub.status === "approved"
                          ? "✓ Live in Gallery"
                          : sub.status === "rejected"
                          ? "Rejected"
                          : "Pending Approval"}
                      </Badge>
                    </div>
                  )}

                  {/* Trekker Details */}
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <h4 className="text-lg font-bold text-white">{sub.name}</h4>
                        <p className="text-xs text-amber-300 font-semibold">
                          {sub.trek || "Himalayan Expedition"}
                        </p>
                      </div>
                      <span className="text-[11px] text-white/40 flex items-center gap-1 whitespace-nowrap">
                        <Calendar className="w-3 h-3" />
                        {new Date(sub.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>

                    {/* Contact Pills */}
                    <div className="flex flex-wrap gap-2 text-xs mb-4">
                      {sub.email && (
                        <a
                          href={`mailto:${sub.email}`}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-white/70 hover:text-white transition-colors"
                        >
                          <Mail className="w-3 h-3 text-amber-400" /> {sub.email}
                        </a>
                      )}
                      {sub.phone && (
                        <a
                          href={`https://wa.me/${sub.phone.replace(/[^0-9]/g, "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-white/70 hover:text-emerald-400 transition-colors"
                        >
                          <Phone className="w-3 h-3 text-emerald-400" /> {sub.phone}
                        </a>
                      )}
                    </div>

                    {/* Story / Experience */}
                    {sub.story && (
                      <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-white/80 italic leading-relaxed">
                        "{sub.story}"
                      </div>
                    )}
                  </div>
                </div>

                {/* Bottom Actions Bar */}
                <div className="p-4 bg-slate-950/60 border-t border-white/10 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    {sub.status !== "approved" && (
                      <Button
                        size="sm"
                        onClick={() => approve.mutate({ id: sub.id })}
                        disabled={approve.isPending || reject.isPending}
                        className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-950/40"
                      >
                        <Check className="w-3.5 h-3.5 mr-1" /> Approve & Publish
                      </Button>
                    )}

                    {sub.status !== "rejected" && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => reject.mutate({ id: sub.id })}
                        disabled={approve.isPending || reject.isPending}
                        className="border-white/15 text-white/80 hover:text-white hover:bg-rose-500/20 hover:border-rose-400 text-xs"
                      >
                        <X className="w-3.5 h-3.5 mr-1" /> Reject
                      </Button>
                    )}
                  </div>

                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      if (window.confirm(`Permanently delete submission from ${sub.name}?`)) {
                        remove.mutate({ id: sub.id });
                      }
                    }}
                    disabled={remove.isPending}
                    className="text-white/40 hover:text-rose-400 hover:bg-rose-500/10 p-2"
                    title="Delete permanently"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Lightbox Photo Preview Modal */}
      {selectedPhoto && (
        <Dialog open={!!selectedPhoto} onOpenChange={() => setSelectedPhoto(null)}>
          <DialogContent className="max-w-3xl bg-slate-950 border-white/15 text-white p-4">
            <DialogHeader className="mb-2">
              <DialogTitle className="text-lg font-bold text-white">
                {selectedPhoto.title}
              </DialogTitle>
              {selectedPhoto.subtitle && (
                <p className="text-xs text-amber-300 font-semibold">
                  {selectedPhoto.subtitle}
                </p>
              )}
            </DialogHeader>
            <div className="relative rounded-xl overflow-hidden bg-black max-h-[75vh] flex items-center justify-center">
              <img
                src={selectedPhoto.url}
                alt={selectedPhoto.title}
                className="max-h-[75vh] w-auto object-contain rounded-lg"
              />
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
