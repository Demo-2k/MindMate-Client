import { motion } from "framer-motion";

export const DoneBreathExercise = ({ onDone }: { onDone: () => void }) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center z-50">
      <div
        className="relative w-[320px] rounded-2xl shadow-2xl p-6 flex flex-col items-center gap-4 
                      bg-black/40 backdrop-blur-md border border-[#fec195]/30 text-gray-100"
      >
        {/* Message */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-sm text-center"
        >
          Сайн байна, чи амьсгалын дасгал хийлээ. Чиний сэтгэл санаа бага зэрэг
          хөнгөрсөн байх гэж найдаж байна. Одоо надтай ярилцаж үзмээр байна уу?
        </motion.p>

        {/* Divider */}
        <div className="w-10 h-[2px] bg-[#fec195]/50 rounded-full"></div>

        {/* Image */}
        <motion.img
          src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExYTFkeGJvbWNqNjBqY2RxaWgxODd0M2tkcjVyaXB4YW5pbDc3MjU3bSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/1w019F86H4vfpkZoRz/giphy.gif"
          alt="Relaxing GIF"
          className="w-full rounded-xl shadow-md"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        />

          <img
            src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExbnY4dWJ5MzloYjVhMXcxbnlvOGo2bTYxZDYydnB5MTByaG5tMzJiOSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/xSuZSyJDe3JvpAWV47/giphy.gif"
            alt="Relaxing GIF"
            className="w-40 sm:w-52 md:w-72 lg:w-full rounded-xl shadow-md"
          />

        {/* Button */}
        <motion.button
          onClick={onDone}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-2 w-full bg-black border border-[#fec195] text-white py-2 rounded-xl 
                     hover:bg-[#fec195] hover:text-black transition-colors"
        >
          Чат руу буцах
        </motion.button>
      </div>
    </div>
  );
};
