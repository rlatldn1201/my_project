// HTML 문서가 완전히 로드된 후 실행
document.addEventListener("DOMContentLoaded", () => {
    // 모든 네비게이션 링크 선택
    const navLinks = document.querySelectorAll('.nav-menu a');

    // 각 링크에 클릭 이벤트 추가
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // 기본 링크 이동 방지
            
            // href 속성에서 id 값을 가져와서 해당 요소 찾기 (예: #about)
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            // 해당 섹션으로 부드럽게 스크롤
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});