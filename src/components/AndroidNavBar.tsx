import { useNavigate } from "react-router-dom";

const AndroidNavBar = () => {
  const navigate = useNavigate();

  return (
    <div className="h-10 flex items-center justify-center gap-16 bg-[#1C1C1E] shrink-0">
      {/* Recent apps - three vertical lines */}
      <button className="text-[#888] hover:text-[#ccc] transition-colors p-2">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <line x1="4" y1="4" x2="4" y2="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <line x1="9" y1="4" x2="9" y2="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <line x1="14" y1="4" x2="14" y2="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
      {/* Home - horizontal pill/line */}
      <button
        onClick={() => navigate("/")}
        className="w-16 h-1 rounded-full bg-[#666] hover:bg-[#888] transition-colors"
      />
      {/* Back - triangle pointing left */}
      <button
        onClick={() => navigate(-1)}
        className="text-[#888] hover:text-[#ccc] transition-colors p-2"
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M12 3L5 9L12 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
};

export default AndroidNavBar;
