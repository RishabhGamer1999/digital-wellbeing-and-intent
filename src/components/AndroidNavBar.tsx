import { ChevronLeft, Square } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AndroidNavBar = () => {
  const navigate = useNavigate();

  return (
    <div className="h-10 flex items-center justify-around bg-[#1C1C1E] border-t border-[#2C2C2E] shrink-0">
      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="text-[#888] hover:text-[#ccc] transition-colors p-2"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      {/* Home pill */}
      <button
        onClick={() => navigate("/")}
        className="w-16 h-1 rounded-full bg-[#666] hover:bg-[#888] transition-colors"
      />
      {/* Recents */}
      <button className="text-[#888] hover:text-[#ccc] transition-colors p-2">
        <Square className="w-4 h-4" strokeWidth={2.5} />
      </button>
    </div>
  );
};

export default AndroidNavBar;
