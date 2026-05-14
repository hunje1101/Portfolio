function Link() {
  return (
    <div className="h-[22px] relative shrink-0 w-[155px]" data-name="Link">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Switzer:Medium',sans-serif] justify-center leading-[0] left-0 not-italic text-[16px] text-black top-[11.5px] tracking-[-0.0762px] w-[67px]">
        <p className="leading-[20.8px]">Home</p>
      </div>
    </div>
  );
}

function Link1() {
  return (
    <div className="h-px relative shrink-0 w-[155px]" data-name="Link">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 155 1">
        <g id="Link">
          <path d="M0 0.5H139" id="Vector 1" stroke="var(--stroke-0, black)" />
        </g>
      </svg>
    </div>
  );
}

function Link2() {
  return (
    <div className="h-[22px] relative shrink-0 w-[155px]" data-name="Link">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Switzer:Medium',sans-serif] justify-center leading-[0] left-0 not-italic text-[16px] text-black top-[11px] tracking-[-0.0762px] whitespace-nowrap">
        <p className="leading-[20.8px]">About</p>
      </div>
    </div>
  );
}

function Link3() {
  return (
    <div className="h-px relative shrink-0 w-[155px]" data-name="Link">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 155 1">
        <g id="Link">
          <path d="M0 0.5H139" id="Vector 1" stroke="var(--stroke-0, black)" />
        </g>
      </svg>
    </div>
  );
}

function Link4() {
  return (
    <div className="h-[22px] relative shrink-0 w-[155px]" data-name="Link">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Switzer:Medium',sans-serif] justify-center leading-[0] left-0 not-italic text-[16px] text-black top-[11px] tracking-[-0.0762px] whitespace-nowrap">
        <p className="leading-[20.8px]">Projects</p>
      </div>
    </div>
  );
}

function Link5() {
  return (
    <div className="h-px relative shrink-0 w-[155px]" data-name="Link">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 155 1">
        <g id="Link">
          <path d="M0 0.5H139" id="Vector 1" stroke="var(--stroke-0, black)" />
        </g>
      </svg>
    </div>
  );
}

function Link6() {
  return (
    <div className="h-[22px] relative shrink-0 w-[155px]" data-name="Link">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Switzer:Medium',sans-serif] justify-center leading-[0] left-0 not-italic text-[16px] text-black top-[11px] tracking-[-0.0762px] whitespace-nowrap">
        <p className="leading-[20.8px]">Index</p>
      </div>
    </div>
  );
}

function Link7() {
  return (
    <div className="h-px relative shrink-0 w-[155px]" data-name="Link">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 155 1">
        <g id="Link">
          <path d="M0 0.5H139" id="Vector 1" stroke="var(--stroke-0, black)" />
        </g>
      </svg>
    </div>
  );
}

function Frame3() {
  return (
    <div className="relative shrink-0">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-px items-start relative">
        <Link />
        <Link1 />
        <Link2 />
        <Link3 />
        <Link4 />
        <Link5 />
        <Link6 />
        <Link7 />
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="h-[100px] relative shrink-0 w-[155px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Frame3 />
      </div>
    </div>
  );
}

function Navigation() {
  return (
    <div className="content-stretch flex flex-col h-[100px] items-start relative shrink-0 w-[155px]" data-name="Navigation">
      <Container />
    </div>
  );
}

function Button() {
  return (
    <div className="h-[21px] relative shrink-0 w-[10px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Switzer:Medium','Noto_Sans_Symbols:Medium',sans-serif] leading-[20.8px] left-0 text-[13px] text-black top-0 tracking-[-0.0762px] whitespace-nowrap" style={{ fontVariationSettings: "'wght' 500" }}>
          →
        </p>
      </div>
    </div>
  );
}

function EmailInput() {
  return (
    <div className="bg-[rgba(239,239,239,0)] flex-[140.5_0_0] h-[21px] min-h-px min-w-px relative" data-name="Email Input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center px-[8px] py-[2px] relative size-full">
          <p className="font-['Switzer:Medium',sans-serif] leading-[16px] not-italic relative shrink-0 text-[12px] text-black tracking-[-0.0762px] whitespace-nowrap">hunje1101@gmail.com</p>
        </div>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex h-[20.5px] items-start mb-[-2px] pr-[-3.672px] relative shrink-0 w-full" data-name="Container">
      <Button />
      <EmailInput />
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[2px] relative shrink-0 w-[155px]">
      <div className="flex flex-col font-['Switzer:Medium',sans-serif] h-[15px] justify-center leading-[0] mb-[-2px] not-italic relative shrink-0 text-[12px] text-black tracking-[-0.0762px] w-full">
        <p className="leading-[20.8px]">Contact for inquiry</p>
      </div>
      <Container1 />
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex flex-col gap-[30px] items-start relative shrink-0">
      <Navigation />
      <Frame />
    </div>
  );
}

function Link8() {
  return (
    <div className="h-[16.5px] relative shrink-0 w-[50.672px]" data-name="Link">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute decoration-solid font-['Inter:Regular',sans-serif] font-normal leading-[16.5px] left-0 not-italic text-[11px] text-black top-[0.5px] tracking-[0.0645px] underline whitespace-nowrap">Behance</p>
      </div>
    </div>
  );
}

function Link9() {
  return (
    <div className="h-[16.5px] relative shrink-0 w-[52.25px]" data-name="Link">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute decoration-solid font-['Inter:Regular',sans-serif] font-normal leading-[16.5px] left-0 not-italic text-[11px] text-black top-[0.5px] tracking-[0.0645px] underline whitespace-nowrap">Instagram</p>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex gap-[16px] h-[16.5px] items-start relative shrink-0 w-[155px]" data-name="Container">
      <Link8 />
      <Link9 />
    </div>
  );
}

function Frame2() {
  return (
    <div className="relative shrink-0">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[651px] items-start relative">
        <Frame1 />
        <Container2 />
      </div>
    </div>
  );
}

function D() {
  return (
    <div className="h-[857px] relative shrink-0 w-[182px]" data-name="D">
      <div aria-hidden="true" className="absolute border-black border-r border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pl-[14px] pr-[15px] py-[14px] relative size-full">
        <Frame2 />
      </div>
    </div>
  );
}

function Frame4() {
  return <div className="absolute h-[47px] left-0 top-0 w-[1330px]" />;
}

function Container3() {
  return (
    <div className="content-stretch flex h-[192px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-b-[2.2px] border-black border-solid inset-[0_0_-2.2px_0] pointer-events-none" />
      <div className="font-['Switzer:Medium',sans-serif] leading-[37px] not-italic relative shrink-0 text-[32px] text-black tracking-[-0.0762px] w-[1107px] whitespace-pre-wrap">
        <p className="mb-0">
          {`Eunje Heo is a graphic designer based in Seoul & London, specialising in brand experience. Through her background of visual and technology, `}
          <br aria-hidden="true" />
          {`Eunje creates distinctive experience for the project. `}
        </p>
        <p>
          <br aria-hidden="true" />
          Dear future co-workers, I’m available for new work!
        </p>
      </div>
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex flex-col h-[213px] items-center pb-[10px] pt-[19px] relative shrink-0 w-[1296px]">
      <Container3 />
    </div>
  );
}

function Frame12() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute content-stretch flex flex-col gap-[4px] items-start left-[calc(50%-549px)] top-[calc(50%+144.5px)] w-[198px]">
      <div className="flex items-center justify-center relative shrink-0 w-full">
        <div className="-scale-y-100 flex-none w-full">
          <div className="flex flex-col font-['Switzer:Medium',sans-serif] justify-center leading-[0] not-italic relative text-[#262626] text-[20px] tracking-[-0.0762px] w-full">
            <p className="leading-[20.8px]">Self-Initiated</p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center relative shrink-0 w-full">
        <div className="-scale-y-100 flex-none w-full">
          <div className="flex flex-col font-['Switzer:Medium',sans-serif] justify-center leading-[0] not-italic relative text-[#262626] text-[20px] tracking-[-0.0762px] w-full">
            <p className="leading-[20.8px]">OFFit</p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center relative shrink-0 w-full">
        <div className="-scale-y-100 flex-none w-full">
          <div className="flex flex-col font-['Switzer:Medium',sans-serif] justify-center leading-[0] not-italic relative text-[#262626] text-[20px] tracking-[-0.0762px] w-full">
            <p className="leading-[20.8px]">2025</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame10() {
  return (
    <div className="content-stretch flex h-[29px] items-center justify-center p-[10px] relative rounded-[500px] shrink-0">
      <div aria-hidden="true" className="absolute border-[1.3px] border-black border-solid inset-[-0.65px] pointer-events-none rounded-[500.65px]" />
      <div className="flex items-center justify-center relative shrink-0">
        <div className="-scale-y-100 flex-none">
          <div className="flex flex-col font-['Switzer:Medium',sans-serif] justify-center leading-[0] not-italic relative text-[#262626] text-[16px] tracking-[-0.0762px] whitespace-nowrap">
            <p className="leading-[20.8px]">UI Design</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex h-[29px] items-center justify-center p-[10px] relative rounded-[500px] shrink-0">
      <div aria-hidden="true" className="absolute border-[1.3px] border-black border-solid inset-[-0.65px] pointer-events-none rounded-[500.65px]" />
      <div className="flex items-center justify-center relative shrink-0">
        <div className="-scale-y-100 flex-none">
          <div className="flex flex-col font-['Switzer:Medium',sans-serif] justify-center leading-[0] not-italic relative text-[#262626] text-[16px] tracking-[-0.0762px] whitespace-nowrap">
            <p className="leading-[20.8px]">Brand Identity</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame14() {
  return (
    <div className="content-stretch flex h-[29px] items-center justify-center p-[10px] relative rounded-[500px] shrink-0">
      <div aria-hidden="true" className="absolute border-[1.3px] border-black border-solid inset-[-0.65px] pointer-events-none rounded-[500.65px]" />
      <div className="flex items-center justify-center relative shrink-0">
        <div className="-scale-y-100 flex-none">
          <div className="flex flex-col font-['Switzer:Medium',sans-serif] justify-center leading-[0] not-italic relative text-[#262626] text-[16px] tracking-[-0.0762px] whitespace-nowrap">
            <p className="leading-[20.8px]">Package Design</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame11() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full">
      <Frame10 />
      <Frame9 />
      <Frame14 />
    </div>
  );
}

function Frame13() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-px top-[16px] w-[265px]">
      <Frame11 />
    </div>
  );
}

function Container4() {
  return (
    <div className="bg-[rgba(255,255,255,0)] h-[410px] relative w-[1296px]" data-name="Container">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <Frame12 />
        <div className="absolute flex h-[411px] items-center justify-center left-[565px] top-[-3px] w-[728px]">
          <div className="-scale-y-100 flex-none">
            <div className="bg-[#d9d9d9] h-[411px] w-[728px]" />
          </div>
        </div>
        <div className="absolute flex h-0 items-center justify-center left-[-3px] top-[408px] w-[1296px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
          <div className="-rotate-90 -scale-y-100 flex-none">
            <div className="h-[1296px] relative w-0">
              <div className="absolute inset-[0_-1.1px]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.2 1296">
                  <path d="M1.1 0V1296" id="Vector 4" stroke="var(--stroke-0, black)" strokeWidth="2.2" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute flex h-0 items-center justify-center left-[-3px] top-px w-[1296px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
          <div className="-rotate-90 -scale-y-100 flex-none">
            <div className="h-[1296px] relative w-0">
              <div className="absolute inset-[0_-1.1px]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.2 1296">
                  <path d="M1.1 0V1296" id="Vector 4" stroke="var(--stroke-0, black)" strokeWidth="2.2" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <Frame13 />
        <div className="absolute flex h-[411px] items-center justify-center left-[565px] top-[-3px] w-0">
          <div className="-scale-y-100 flex-none">
            <div className="h-[411px] relative w-0">
              <div className="absolute inset-[0_-1.1px]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2.2 411">
                  <path d="M1.1 0V205.5V308.25V411" id="Vector 2" stroke="var(--stroke-0, black)" strokeWidth="2.2" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-0 border-[#404040] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex h-[25px] items-center justify-center p-[10px] relative rounded-[400px] w-[124px]">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0)] border-solid inset-[-0.5px] pointer-events-none rounded-[400.5px]" />
      <div className="flex flex-col font-['Switzer:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-[rgba(255,255,255,0)] tracking-[-0.0762px] whitespace-nowrap">
        <p className="leading-[20.8px]">Brand Identity</p>
      </div>
    </div>
  );
}

function Container7() {
  return <div className="absolute bg-[rgba(255,255,255,0.3)] h-[363px] left-[561px] top-[50px] w-[3px]" data-name="Container" />;
}

function Container6() {
  return (
    <div className="absolute h-[398px] left-px top-[-1px] w-[165px]" data-name="Container">
      <div className="absolute flex h-[25px] items-center justify-center left-[15px] top-[358px] w-[124px]">
        <div className="-scale-y-100 flex-none">
          <Frame8 />
        </div>
      </div>
      <Container7 />
    </div>
  );
}

function Container5() {
  return (
    <div className="bg-black h-[406px] relative w-full" data-name="Container">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <Container6 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#404040] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-[1296px]">
      <div className="flex items-center justify-center relative shrink-0">
        <div className="-scale-y-100 flex-none">
          <Container4 />
        </div>
      </div>
      <div className="flex items-center justify-center relative shrink-0 w-full">
        <div className="-scale-y-100 flex-none w-full">
          <Container5 />
        </div>
      </div>
    </div>
  );
}

function Frame5() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[32px] items-start left-[20px] top-0 w-[1310px]">
      <Frame6 />
      <Frame7 />
    </div>
  );
}

function MainContent() {
  return (
    <div className="flex-[1332_0_0] h-[857px] min-h-px min-w-px relative" data-name="Main Content">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <Frame4 />
        <Frame5 />
      </div>
    </div>
  );
}

export default function InteractivePortfolioWebsite() {
  return (
    <div className="bg-white content-stretch flex items-start relative size-full" data-name="Interactive Portfolio Website">
      <D />
      <MainContent />
    </div>
  );
}