function Link() {
  return (
    <div className="h-[22px] relative shrink-0 w-[155px]" data-name="Link">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Switzer:Medium',sans-serif] justify-center leading-[0] left-0 not-italic text-[14px] text-black top-[11px] tracking-[-0.0762px] w-[38px]">
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
      <div className="-translate-y-1/2 absolute flex flex-col font-['Switzer:Medium',sans-serif] justify-center leading-[0] left-0 not-italic text-[14px] text-black top-[11px] tracking-[-0.0762px] whitespace-nowrap">
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
      <div className="-translate-y-1/2 absolute flex flex-col font-['Switzer:Medium',sans-serif] justify-center leading-[0] left-0 not-italic text-[14px] text-black top-[11px] tracking-[-0.0762px] whitespace-nowrap">
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
      <div className="-translate-y-1/2 absolute flex flex-col font-['Switzer:Medium',sans-serif] justify-center leading-[0] left-0 not-italic text-[14px] text-black top-[11px] tracking-[-0.0762px] whitespace-nowrap">
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
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative">
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
        <p className="absolute font-['Switzer:Medium','Noto_Sans:Medium',sans-serif] leading-[20.8px] left-0 text-[13px] text-black top-0 tracking-[-0.0762px] whitespace-nowrap" style={{ fontVariationSettings: "'CTGR' 0, 'wdth' 100, 'wght' 500" }}>
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

function Frame5() {
  return <div className="absolute h-[47px] left-0 top-0 w-[1330px]" />;
}

function Container3() {
  return (
    <div className="content-stretch flex h-[191px] items-start justify-between pb-px relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-b border-black border-solid inset-0 pointer-events-none" />
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

function Frame7() {
  return (
    <div className="content-stretch flex flex-col h-[210px] items-center pb-[10px] pt-[19px] relative shrink-0 w-[1317px]">
      <Container3 />
    </div>
  );
}

function Container5() {
  return <div className="absolute bg-black border border-[#262626] border-solid h-[406.25px] left-0 top-0 w-[1300px]" data-name="Container" />;
}

function Frame4() {
  return (
    <div className="content-stretch flex h-[25px] items-center justify-center p-[10px] relative rounded-[400px] w-[136px]">
      <div aria-hidden="true" className="absolute border border-solid border-white inset-[-0.5px] pointer-events-none rounded-[400.5px]" />
      <div className="flex flex-col font-['Switzer:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-white tracking-[-0.0762px] whitespace-nowrap">
        <p className="leading-[20.8px]">Brand Identity</p>
      </div>
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex h-[25px] items-center justify-center p-[10px] relative rounded-[400px] w-[136px]">
      <div aria-hidden="true" className="absolute border border-solid border-white inset-[-0.5px] pointer-events-none rounded-[400.5px]" />
      <div className="flex flex-col font-['Switzer:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-white tracking-[-0.0762px] whitespace-nowrap">
        <p className="leading-[20.8px]">Editorial</p>
      </div>
    </div>
  );
}

function Container8() {
  return <div className="absolute bg-[rgba(255,255,255,0.3)] h-[282.984px] left-[165px] top-[99.52px] w-px" data-name="Container" />;
}

function Container7() {
  return (
    <div className="absolute h-[398px] left-0 top-[-2px] w-[844px]" data-name="Container">
      <div className="absolute flex h-[25px] items-center justify-center left-[15px] top-[358px] w-[136px]">
        <div className="-scale-y-100 flex-none">
          <Frame4 />
        </div>
      </div>
      <div className="absolute flex h-[25px] items-center justify-center left-[15px] top-[325px] w-[136px]">
        <div className="-scale-y-100 flex-none">
          <Frame8 />
        </div>
      </div>
      <Container8 />
    </div>
  );
}

function Container6() {
  return (
    <div className="bg-black border border-[#404040] border-solid h-[406px] overflow-clip relative w-[1296px]" data-name="Container">
      <Container7 />
    </div>
  );
}

function C() {
  return (
    <div className="absolute h-[406.25px] left-0 top-[836.5px] w-[1300px]" data-name="C">
      <Container5 />
      <div className="absolute flex h-[406px] items-center justify-center left-0 top-[-405.5px] w-[1296px]">
        <div className="-scale-y-100 flex-none">
          <Container6 />
        </div>
      </div>
    </div>
  );
}

function Container9() {
  return <div className="absolute bg-black border border-[#262626] border-solid h-[406.25px] left-0 top-0 w-[1300px]" data-name="Container" />;
}

function Text() {
  return (
    <div className="h-[13.5px] relative shrink-0 w-[67.398px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[13.5px] left-0 not-italic text-[9px] text-white top-[0.5px] tracking-[0.167px] whitespace-nowrap">→ 20:00</p>
      </div>
    </div>
  );
}

function Text1() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[67.398px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[13.5px] left-0 not-italic text-[9px] text-white top-[0.5px] tracking-[0.167px] whitespace-nowrap">→ Performance</p>
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="absolute content-stretch flex flex-col h-[27px] items-start left-[8px] top-[369.25px] w-[67.398px]" data-name="Container">
      <Text />
      <Text1 />
    </div>
  );
}

function Container13() {
  return <div className="absolute bg-[rgba(255,255,255,0.3)] h-[282.984px] left-[70px] top-[60.63px] w-px" data-name="Container" />;
}

function Container11() {
  return (
    <div className="absolute h-[404.25px] left-0 top-[-2px] w-[843.703px]" data-name="Container">
      <Container12 />
      <Container13 />
    </div>
  );
}

function Container10() {
  return (
    <div className="bg-black border border-[#404040] border-solid h-[406px] overflow-clip relative w-[1300px]" data-name="Container">
      <Container11 />
    </div>
  );
}

function C1() {
  return (
    <div className="absolute h-[406.25px] left-0 top-[1254.75px] w-[1300px]" data-name="C">
      <Container9 />
      <div className="absolute flex h-[406px] items-center justify-center left-0 top-[-406px] w-[1300px]">
        <div className="-scale-y-100 flex-none">
          <Container10 />
        </div>
      </div>
    </div>
  );
}

function Container14() {
  return <div className="absolute bg-black border border-[#262626] border-solid h-[406.25px] left-0 top-0 w-[1300px]" data-name="Container" />;
}

function Text2() {
  return (
    <div className="h-[13.5px] relative shrink-0 w-[54.906px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[13.5px] left-0 not-italic text-[9px] text-white top-[0.5px] tracking-[0.167px] whitespace-nowrap">→ 14:00</p>
      </div>
    </div>
  );
}

function Text3() {
  return (
    <div className="h-[13.5px] relative shrink-0 w-[54.906px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[13.5px] left-0 not-italic text-[9px] text-white top-[0.5px] tracking-[0.167px] whitespace-nowrap">→ Workshop</p>
      </div>
    </div>
  );
}

function Text4() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[54.906px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[13.5px] left-0 not-italic text-[9px] text-white top-[0.5px] tracking-[0.167px] whitespace-nowrap">→ go BOOM</p>
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="absolute content-stretch flex flex-col h-[40.5px] items-start left-[8px] top-[355.75px] w-[54.906px]" data-name="Container">
      <Text2 />
      <Text3 />
      <Text4 />
    </div>
  );
}

function Container18() {
  return <div className="absolute bg-[rgba(255,255,255,0.3)] h-[282.984px] left-[70px] top-[60.63px] w-px" data-name="Container" />;
}

function Container16() {
  return (
    <div className="absolute h-[404.25px] left-0 top-[-2px] w-[843.703px]" data-name="Container">
      <Container17 />
      <Container18 />
    </div>
  );
}

function Container15() {
  return (
    <div className="bg-black border border-[#404040] border-solid h-[406px] overflow-clip relative w-[1300px]" data-name="Container">
      <Container16 />
    </div>
  );
}

function C2() {
  return (
    <div className="absolute h-[406.25px] left-0 top-[1673px] w-[1300px]" data-name="C">
      <Container14 />
      <div className="absolute flex h-[406px] items-center justify-center left-0 top-[-406px] w-[1300px]">
        <div className="-scale-y-100 flex-none">
          <Container15 />
        </div>
      </div>
    </div>
  );
}

function Container19() {
  return <div className="absolute bg-black border border-[#262626] border-solid h-[406.25px] left-0 top-0 w-[1300px]" data-name="Container" />;
}

function Text5() {
  return (
    <div className="h-[13.5px] relative shrink-0 w-[92.711px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[13.5px] left-0 not-italic text-[9px] text-white top-[0.5px] tracking-[0.167px] whitespace-nowrap">→ 20:00</p>
      </div>
    </div>
  );
}

function Text6() {
  return (
    <div className="h-[13.5px] relative shrink-0 w-[92.711px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[13.5px] left-0 not-italic text-[9px] text-white top-[0.5px] tracking-[0.167px] whitespace-nowrap">→ Film</p>
      </div>
    </div>
  );
}

function Text7() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[92.711px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[13.5px] left-0 not-italic text-[9px] text-white top-[0.5px] tracking-[0.167px] whitespace-nowrap">→ Art Cinema OFFoff</p>
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="absolute content-stretch flex flex-col h-[40.5px] items-start left-[8px] top-[355.75px] w-[92.711px]" data-name="Container">
      <Text5 />
      <Text6 />
      <Text7 />
    </div>
  );
}

function Container23() {
  return <div className="absolute bg-[rgba(255,255,255,0.3)] h-[282.984px] left-[70px] top-[60.63px] w-px" data-name="Container" />;
}

function Container21() {
  return (
    <div className="absolute h-[404.25px] left-0 top-[-2px] w-[843.703px]" data-name="Container">
      <Container22 />
      <Container23 />
    </div>
  );
}

function Container20() {
  return (
    <div className="bg-black border border-[#404040] border-solid h-[406px] overflow-clip relative w-[1300px]" data-name="Container">
      <Container21 />
    </div>
  );
}

function C3() {
  return (
    <div className="absolute h-[406.25px] left-0 top-[2091.25px] w-[1300px]" data-name="C">
      <Container19 />
      <div className="absolute flex h-[406px] items-center justify-center left-0 top-[-406px] w-[1300px]">
        <div className="-scale-y-100 flex-none">
          <Container20 />
        </div>
      </div>
    </div>
  );
}

function Container24() {
  return <div className="absolute bg-black border border-[#262626] border-solid h-[406.25px] left-0 top-0 w-[1300px]" data-name="Container" />;
}

function Text8() {
  return (
    <div className="h-[13.5px] relative shrink-0 w-[64.906px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[13.5px] left-0 not-italic text-[9px] text-white top-[0.5px] tracking-[0.167px] whitespace-nowrap">→ 19:30</p>
      </div>
    </div>
  );
}

function Text9() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[64.906px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[13.5px] left-0 not-italic text-[9px] text-white top-[0.5px] tracking-[0.167px] whitespace-nowrap">→ Book launch</p>
      </div>
    </div>
  );
}

function Container27() {
  return (
    <div className="absolute content-stretch flex flex-col h-[27px] items-start left-[8px] top-[369.25px] w-[64.906px]" data-name="Container">
      <Text8 />
      <Text9 />
    </div>
  );
}

function Container28() {
  return <div className="absolute bg-[rgba(255,255,255,0.3)] h-[282.984px] left-[70px] top-[60.63px] w-px" data-name="Container" />;
}

function Container26() {
  return (
    <div className="absolute h-[404.25px] left-0 top-[-2px] w-[843.703px]" data-name="Container">
      <Container27 />
      <Container28 />
    </div>
  );
}

function Container25() {
  return (
    <div className="bg-black border border-[#404040] border-solid h-[406px] overflow-clip relative w-[1300px]" data-name="Container">
      <Container26 />
    </div>
  );
}

function C4() {
  return (
    <div className="absolute h-[406.25px] left-0 top-[2509.5px] w-[1300px]" data-name="C">
      <Container24 />
      <div className="absolute flex h-[406px] items-center justify-center left-0 top-[-406px] w-[1300px]">
        <div className="-scale-y-100 flex-none">
          <Container25 />
        </div>
      </div>
    </div>
  );
}

function Container29() {
  return <div className="absolute bg-black border border-[#262626] border-solid h-[406.25px] left-0 top-0 w-[1300px]" data-name="Container" />;
}

function Text10() {
  return (
    <div className="h-[13.5px] relative shrink-0 w-[64.906px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[13.5px] left-0 not-italic text-[9px] text-white top-[0.5px] tracking-[0.167px] whitespace-nowrap">→ 19:30</p>
      </div>
    </div>
  );
}

function Text11() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[64.906px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[13.5px] left-0 not-italic text-[9px] text-white top-[0.5px] tracking-[0.167px] whitespace-nowrap">→ Book launch</p>
      </div>
    </div>
  );
}

function Container32() {
  return (
    <div className="absolute content-stretch flex flex-col h-[27px] items-start left-[8px] top-[369.25px] w-[64.906px]" data-name="Container">
      <Text10 />
      <Text11 />
    </div>
  );
}

function Container33() {
  return <div className="absolute bg-[rgba(255,255,255,0.3)] h-[282.984px] left-[70px] top-[60.63px] w-px" data-name="Container" />;
}

function Container31() {
  return (
    <div className="absolute h-[404.25px] left-0 top-[-2px] w-[843.703px]" data-name="Container">
      <Container32 />
      <Container33 />
    </div>
  );
}

function Container30() {
  return (
    <div className="bg-black border border-[#404040] border-solid h-[406px] overflow-clip relative w-[1300px]" data-name="Container">
      <Container31 />
    </div>
  );
}

function C5() {
  return (
    <div className="absolute h-[406.25px] left-0 top-[2927.75px] w-[1300px]" data-name="C">
      <Container29 />
      <div className="absolute flex h-[406px] items-center justify-center left-0 top-[-406px] w-[1300px]">
        <div className="-scale-y-100 flex-none">
          <Container30 />
        </div>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="bg-black h-[3334px] relative shrink-0 w-[1297px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#404040] border-solid inset-0 pointer-events-none" />
      <C />
      <C1 />
      <C2 />
      <C3 />
      <C4 />
      <C5 />
    </div>
  );
}

function Frame6() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[14px] items-start left-[20px] top-0 w-[1310px]">
      <Frame7 />
      <Container4 />
    </div>
  );
}

function MainContent() {
  return (
    <div className="flex-[1332_0_0] h-[857px] min-h-px min-w-px relative" data-name="Main Content">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <Frame5 />
        <Frame6 />
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