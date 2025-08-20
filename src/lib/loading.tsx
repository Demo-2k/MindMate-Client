export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-[100vh] w-full gap-4">
      {/* Гэрэлтэж эргэдэг дугуй */}
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-yellow-400 border-t-transparent animate-spin"></div>
        <span className="absolute inset-0 flex items-center justify-center text-yellow-600 text-2xl font-bold">
          ✦
        </span>
      </div>

      {/* Mystical text */}
      <p className="text-lg font-semibold text-yellow-700 tracking-widest animate-pulse">
        Уншиж байна түр хүлээнэ үү...
      </p>
    </div>
  );
}
