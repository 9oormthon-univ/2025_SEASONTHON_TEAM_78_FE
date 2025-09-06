import { useMemo, useRef, useState, useEffect } from "react";
import BackHeader from "@/components/Navbar/BackNavBar";
import BoxButtonLarge from "@/components/common/BoxButtonLarge";
import { useMe } from "@/hooks/useMe";
import { updateMyProfile } from "@/lib/api/userProfile";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type Sticker = { id: string; src: string; alt: string };

const STICKERS: Sticker[] = [
  { id: "emoji-1", src: "/images/emoji-wow.webp", alt: "wow" },
  { id: "emoji-2", src: "/images/emoji-cool.webp", alt: "cool" },
  { id: "emoji-3", src: "/images/emoji-heart.webp", alt: "heart" },
];

function EditProfile() {
  const inputRef = useRef<HTMLInputElement>(null);
  const MAX_LEN = 11;

  // 내 프로필
  const { data: me, isLoading, error } = useMe();

  // 상태
  const [nickname, setNickname] = useState<string>("");
  const [selected, setSelected] = useState<string>("");

  // 초기 세팅
  useEffect(() => {
    if (me) {
      setNickname(me.nickname ?? "");
      setSelected(me.picture ?? "");
    }
  }, [me]);

  // 변경 여부
  const isChanged = useMemo(() => {
    if (!me) return false;
    const initNick = me.nickname ?? "";
    const initPic = me.picture ?? "";
    return nickname.trim() !== initNick || selected !== initPic;
  }, [nickname, selected, me]);

  const qc = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: () =>
      updateMyProfile({ nickname: nickname.trim(), picture: selected }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["me"] });
      alert("프로필이 수정되었습니다!");
    },
    onError: () => {
      alert("수정에 실패했습니다.");
    },
  });

  const handleSubmit = () => mutate();

  if (isLoading) return <p>불러오는 중...</p>;
  if (error) return <p>프로필 불러오기 실패</p>;

  return (
    <div className="min-h-screen bg-white">
      <BackHeader title="회원 정보 수정" />

      <div className="px-4 pt-4 pb-28">
        <section className="flex flex-col gap-3">
          <p className="text-sm font-semibold text-black">닉네임</p>

          <div className="flex flex-col gap-1.5 rounded-2xl">
            <div className="flex items-center gap-2.5 px-4 py-[18px] rounded-2xl bg-[#f4f7fb]">
              <input
                ref={inputRef}
                id="nickname"
                type="text"
                value={nickname}
                onChange={(e) => {
                  if (e.target.value.length <= MAX_LEN) {
                    setNickname(e.target.value);
                  }
                }}
                placeholder="닉네임을 입력해 주세요."
                maxLength={MAX_LEN}
                className="w-full text-base text-[#2a2c2e] bg-transparent outline-none transition-all duration-200"
                aria-describedby="nickname-counter"
              />
            </div>

            <div className="flex justify-end px-1.5">
              <p
                id="nickname-counter"
                className="text-xs font-medium text-[#93979d]"
              >
                {nickname.length}/{MAX_LEN}
              </p>
            </div>
          </div>
        </section>

        <section className="mt-6 flex flex-col gap-3">
          <p className="text-sm font-semibold text-black">프로필 이미지</p>

          <div className="grid grid-cols-3 gap-4">
            {STICKERS.map((s) => {
              const isActive = selected === s.id;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setSelected(s.id)}
                  className={[
                    "flex h-24 w-24 items-center justify-center rounded-[60px] bg-[#f4f7fb]",
                    "transition",
                    isActive
                      ? "border-2 border-[#4672ff] shadow-[0_4px_10px_0_rgba(0,0,0,0.1)]"
                      : "border border-transparent",
                  ].join(" ")}
                >
                  <img
                    src={s.src}
                    alt={s.alt}
                    className="h-20 w-20 object-contain"
                    loading="lazy"
                  />
                </button>
              );
            })}
          </div>
        </section>
      </div>

      <BoxButtonLarge
        onClick={handleSubmit}
        disabled={!isChanged || nickname.trim().length === 0 || isPending}
      >
        {isPending ? "저장 중..." : "수정 완료"}
      </BoxButtonLarge>
    </div>
  );
}

export default EditProfile;
