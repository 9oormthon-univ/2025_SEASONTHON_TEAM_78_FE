// 로컬 스토리지 관리 유틸리티

interface Certification {
  id: string;
  challengeId: string;
  title: string;
  content: string;
  image: string;
  createdAt: string;
}

export const clearOldCertifications = () => {
  try {
    const certifications = JSON.parse(
      localStorage.getItem("certifications") || "[]"
    );

    // 최근 30개만 유지하고 나머지 삭제
    const recentCertifications = certifications
      .sort(
        (a: Certification, b: Certification) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      .slice(0, 30);

    localStorage.setItem(
      "certifications",
      JSON.stringify(recentCertifications)
    );
    console.log(
      `Cleaned up certifications. Kept ${recentCertifications.length} recent items.`
    );

    return recentCertifications;
  } catch (error) {
    console.error("Error cleaning up certifications:", error);
    // 오류 발생 시 모든 인증 데이터 삭제
    localStorage.removeItem("certifications");
    return [];
  }
};

export const getStorageSize = () => {
  let total = 0;
  for (const key in localStorage) {
    if (Object.prototype.hasOwnProperty.call(localStorage, key)) {
      total += localStorage[key].length + key.length;
    }
  }
  return total;
};

export const checkStorageQuota = () => {
  const size = getStorageSize();
  const maxSize = 5 * 1024 * 1024; // 5MB

  if (size > maxSize * 0.8) {
    // 80% 이상 사용 시
    clearOldCertifications();
  }

  return { size, maxSize, usage: (size / maxSize) * 100 };
};
