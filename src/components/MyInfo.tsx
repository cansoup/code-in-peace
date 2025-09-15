import {useEffect, useRef, useState} from 'react';

const MyInfo = () => {
    const [isFixed, setIsFixed] = useState(false);
    const [headerHeight, setHeaderHeight] = useState(0);
    const headerRef = useRef<HTMLElement>(null);
    const nameRef = useRef<HTMLDivElement>(null);
    const detailsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScrollAndResize = () => {
            const scrollY = window.scrollY;

            // 1. 헤더 고정 상태 및 플레이스홀더 높이 관리
            if (scrollY > 0) {
                // 스크롤이 시작되고 헤더가 아직 고정되지 않은 시점에,
                // 플레이스홀더를 위해 원래 헤더의 높이를 한 번만 측정하고 저장합니다.
                if (!isFixed && headerRef.current) {
                    setHeaderHeight(headerRef.current.offsetHeight);
                }
                setIsFixed(true);
            } else {
                setIsFixed(false);
            }

            // 2. 애니메이션 진행률 계산
            const animationEndScroll = 200; // 처음 200px 스크롤 동안 애니메이션이 진행됩니다.
            const scrollProgress = Math.min(scrollY / animationEndScroll, 1);

            // 3. 글자 크기 실시간 변경
            if (nameRef.current) {
                const isDesktop = window.innerWidth >= 768; // Tailwind 'md' 분기점

                // 화면 크기에 따라 시작/종료 폰트 크기 설정
                const startFontSize = isDesktop ? 10 : 3; // 데스크탑: 160px (10rem), 모바일: 48px (3rem)
                const endFontSize = 1.875; // 공통 종료 크기: 30px (1.875rem)

                // 스크롤 진행률에 따라 현재 폰트 크기를 계산 (선형 보간)
                const currentFontSize = startFontSize + (endFontSize - startFontSize) * scrollProgress;

                nameRef.current.style.fontSize = `${currentFontSize}rem`;
            }

            // 4. 상세 정보(직업, 설명) 투명도 변경
            if (detailsRef.current) {
                const currentOpacity = 1 - scrollProgress;
                detailsRef.current.style.opacity = `${currentOpacity}`;
                // 완전히 투명해지면 클릭 등 상호작용을 막습니다.
                detailsRef.current.style.pointerEvents = currentOpacity <= 0 ? 'none' : 'auto';
            }
        };

        // 스크롤과 창 크기 변경 이벤트에 함수를 연결합니다.
        window.addEventListener('scroll', handleScrollAndResize);
        window.addEventListener('resize', handleScrollAndResize);

        // 페이지 로드 시 현재 스크롤 위치에 맞게 한 번 실행합니다.
        handleScrollAndResize();

        // 컴포넌트가 사라질 때 이벤트 리스너를 정리합니다.
        return () => {
            window.removeEventListener('scroll', handleScrollAndResize);
            window.removeEventListener('resize', handleScrollAndResize);
        };
    }, [isFixed]); // isFixed 상태가 바뀔 때 높이 측정 로직을 위해 effect를 다시 설정합니다.

    const headerClasses = `
        ${isFixed
        ? 'fixed top-0 left-0 w-full z-50 px-4 py-4 md:px-16'
        : 'relative'
    }
    `;

    return (
        <>
            {/* 헤더가 fixed 상태일 때 원래 높이만큼 공간을 차지하여 콘텐츠가 위로 점프하는 현상을 방지합니다. */}
            <div style={{height: isFixed ? `${headerHeight}px` : '0'}}/>

            <header ref={headerRef} className={headerClasses}>
                <div
                    ref={nameRef}
                    className="font-bold text-5xl md:text-[160px] leading-none"
                    // 폰트 크기가 변할 때 줄 높이로 인한 레이아웃 변경을 최소화합니다.
                >
                    Minha Kim.
                </div>

                <div ref={detailsRef}>
                    <div className="text-2xl">Web Developer</div>
                    <div className="mt-4 font-light">
                        <p>Building delightful user experiences and</p>
                        <p>committed to mastering new skills in a fast-paced development environment</p>
                    </div>
                </div>
            </header>
        </>
    )
}

export default MyInfo;

