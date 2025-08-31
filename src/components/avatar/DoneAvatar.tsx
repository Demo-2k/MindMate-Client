export const DoneBreathExercise = ({ onDone }: { onDone: () => void }) => {
  const handleDoneClick = () => {
    onDone();
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center z-50">
      {/* Transparent blurred overlay */}
      <div className="absolute inset-0 backdrop-blur-sm bg-white/10"></div>

      {/* Card container */}
      <div className="relative w-[320px] bg-gray-800/80 rounded-2xl shadow-2xl p-6 flex flex-col items-center gap-4">
        {/* Message */}
        <p className="text-center text-gray-100 text-sm">
          Сайн байна, чи амьсгалын дасгал хийлээ. Чиний сэтгэл санаа бага зэрэг
          хөнгөрсөн байх гэж найдаж байна. Одоо надтай ярилцаж үзмээр байна уу?
        </p>

        {/* GIF */}
        <img
          src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExYTFkeGJvbWNqNjBqY2RxaWgxODd0M2tkcjVyaXB4YW5pbDc3MjU3bSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/1w019F86H4vfpkZoRz/giphy.gif"
          alt="Relaxing GIF"
          className="w-full rounded-xl shadow-md"
        />

        {/* Button */}
        <button
          onClick={handleDoneClick}
          className="mt-2 w-full bg-blue-500 text-white py-2 rounded-xl hover:bg-blue-600 transition-colors"
        >
          Чат руу буцах
        </button>
      </div>
    </div>
  );
};
