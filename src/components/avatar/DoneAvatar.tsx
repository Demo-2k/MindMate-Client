export const DoneBreathExercise = ({ onDone }: { onDone: () => void }) => {

  return (
    <div className="absolute inset-0 flex items-center justify-center z-50">
      {/* Transparent blurred overlay */}
      <div className="relative w-[320px] rounded-2xl shadow-2xl p-6 flex flex-col items-center gap-4">
        {/* Blur + translucent background */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-md rounded-2xl"></div>

        {/* Content (message, image, button) */}
        <div className="relative flex flex-col items-center gap-4 text-center text-gray-100">
          <p className="text-sm">
            Сайн байна, чи амьсгалын дасгал хийлээ. Чиний сэтгэл санаа бага
            зэрэг хөнгөрсөн байх гэж найдаж байна. Одоо надтай ярилцаж үзмээр
            байна уу?
          </p>

          <img
            src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExbnY4dWJ5MzloYjVhMXcxbnlvOGo2bTYxZDYydnB5MTByaG5tMzJiOSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/xSuZSyJDe3JvpAWV47/giphy.gif"
            alt="Relaxing GIF"
            className="w-40 sm:w-52 md:w-72 lg:w-full rounded-xl shadow-md"
          />

          <button onClick={onDone} className="mt-2 w-full bg-black border border-[#fec195] text-white py-2 rounded-xl hover:bg-[#fec195] hover:text-black transition-colors">
            Чат руу буцах
          </button>
        </div>
      </div>
    </div>
  );
};
