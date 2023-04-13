import { useState, useEffect } from 'react';
import Image from 'next/image';
import emailjs from '@emailjs/browser';

import { OutlineButton, TagButton, CarouselButton } from '@/components/Buttons';
import { Section } from '@/components/PageLayouts';
import { DisplayCase, Card } from '@/components/Cards';
import { AiOutlineCheck } from 'react-icons/ai';
import { RxCross1 } from 'react-icons/rx';
import { Carousel } from '@/components/Carousel';
import { LightBox } from '@/components/ImageDisplays';
import { Input, Textarea, TestimonialForm } from '@/components/Forms';
import { SuccessAlert, DangerAlert } from '@/components/Alerts';

export function Header({style=""}) {
  return (
    <div className={`w-full h-40vh lg:h-50vh relative ${style}`}>
      <Image src="/img/stock-graph.jpg" alt="Stock graph" fill/>
      <div className="w-full h-full bg-black z-10 opacity-70"></div>
      <div className="absolute top-24 md:top-32 lg:top-40 z-20 inset-x-0 mx-auto text-center px-2">
        <h1 className="text-white font-semibold text-4xl">ForexCopyTrade</h1>
        <p className='text-white text-lg lg:text-2xl mt-2'>A copy trade service for those who cannot sit at a screen for hours on end</p>
        <div className='w-fit mx-auto mt-10'>
          <OutlineButton color="white" style="mx-2" text="Join Eightcap now!" link="https://join.eightcap.com/visit/?bta=38222&brand=eightcap" target='_blank'/>
          <OutlineButton color="white" style="mx-2" text="Contact us" link="/contact-us"/>
        </div>
      </div>
    </div>
  )
}

export function About() {
  return (
    <Section>
      <h1 className="font-semibold text-4xl text-center lg:text-6xl">About me</h1>
      {/*<p className="text-2xl lg:text-3xl text-center mt-4">This is a placeholder for a slogan. The slogan is approximately this long!</p>*/}
      <div className="lg:flex lg:flex-row lg:justify-center mt-6 lg:mt-12">
        <div className="relative h-40vh lg:h-50vh w-80vw lg:w-45% max-w-xl mx-auto lg:mx-6">
          <Image src="/img/stock-laptop.jpg" alt="Stock graph" fill/>
        </div>
        <div className="lg:w-1/2 lg:mx-6">
          <h2 className="text-2xl lg:text-4xl font-normal mt-8 lg:mt-0">Who am I?</h2>
          <p className="mt-4">I am just a simple guy that was looking to add income through investing. I went the traditional way and decided that the banks did not have my best interest at heart. The same can be said for Forex brokers and the so-called &ldquo;guru&apos;s&rdquo;. All of them put on a great show telling me of fortunes to come. Pictures of high end sports cars, fancy mansions, beautiful people surrounding me. Well guess what. None of that was true. The fancy indicators were just a selling point and relieved me of my money. There&apos;s a reason 97% of traders fail. I was one of those 97%. However........ After well over 100k in loss and reliance on indicators. I took time to figure it out.
Well I have a very tight grasp on it. I Don&apos;t have a 100% win rate, (if someone tells you they do, they&apos;re lying) but then again, nobody does. My win rate is very good alongside good money management. I learned some very valuable lessons. The biggest was accepting loss. Remove emotion. I trade what I see and not what I hope to come true. 
You can make money in forex. It takes some time with small balances but it can be done. 
I decided to offer copy trade so folks can see some positive results in their account as they learn. (This was not available when I was learning) I encourage you to trade your own account alongside what I do.</p>
          <h2 className="text-2xl lg:text-4xl font-normal mt-8">Mission statement</h2>
          <p className="mt-4">We shoot for a gain of 1-10%daily. It is very possible to gain more but I prefer sticking to strict set of rules. It is still a better return than any bank will give you or any financial planner. Remember, losses are a factor. Be prepared and accept it. As long as we are going forward in the long run.</p>
        </div>
      </div>
    </Section>
  )
}

export function Disclaimer() {
  return (
    <Section style="bg-violet-700 text-white">
      <h1 className="font-semibold text-4xl text-center lg:text-6xl">Risk disclosure</h1>
      <p className="text-xl lg:text-2xl font-semilight text-center mt-8">
        Trading the financial products of the companies featured on this site carries a high level of risk, including the risk of losing substantially more than your initial investment. You should never invest money that you cannot afford to lose. You should be aware of all the risks associated with foreign exchange trading, and seek advice from an independent financial advisor if you have any doubts.
      </p>
    </Section>
  )
}

export function Service() {
  return (
    <Section>
      <h1 className="font-semibold text-4xl lg:text-6xl">Our services</h1>
      <p className="text-lg lg:text-2xl font-semilight mt-4">Our company provides the following services. Feel free to email us at <a href="mailto:realfxcopier@gmail.com" className="underline text-blue-700">realfxcopier@gmail.com</a> if you have any question about any service!</p>
      <DisplayCase style="mt-12 justify-center">
        <Card header="Month-to-month subscription" style="mx-auto">
          <div className="text-center">
            <span className="text-6xl font-semibold">90</span>
            <span className="text-xl font-normal ml-1">CAD</span>
            <div className="text-xl font-light ml-1 text-slate-500">per month</div>
          </div>
          <ul className="mt-8 px-2 text-lg font-semilight">
            <li className="flex flex-row my-2"><AiOutlineCheck className="text-green-800 font-semibold mt-1 mr-2"/>Real time trade mirrorings</li>
            <li className="flex flex-row my-2"><AiOutlineCheck className="text-green-800 font-semibold mt-1 mr-2"/>Access to a Telegram community</li>
            <li className="flex flex-row my-2"><RxCross1 className="text-red-800 font-semibold mt-2 mr-2"/>Highest-priced package</li>
            <li className="flex flex-row my-2"><RxCross1 className="text-red-800 font-semibold mt-2 mr-2"/>No refunds</li>
            <li className="flex flex-row my-2"><br></br></li>
          </ul>
          <div className="mt-8 mb-4 text-center">
            <OutlineButton color="violet-900" style="text-xl px-4" text="Subscribe now" link="https://buy.stripe.com/7sI2aZ43K1tqcGQdQS" target="_blank"/>
          </div>
        </Card>

        <Card header="3 month subscription" style="mx-auto" highlighted>
          <div className="text-center">
            <span className="text-6xl font-semibold">240</span>
            <span className="text-xl font-normal ml-1">CAD</span>
            <div className="text-xl font-light ml-1 text-slate-500">every 3 months</div>
          </div>
          <ul className="mt-8 px-2 text-lg font-semilight">
            <li className="flex flex-row my-2"><AiOutlineCheck className="text-green-800 font-semibold mt-1 mr-2"/>Real time trade mirrorings</li>
            <li className="flex flex-row my-2"><AiOutlineCheck className="text-green-800 font-semibold mt-1 mr-2"/>Access to a Telegram community</li>
            <li className="flex flex-row my-2"><AiOutlineCheck className="text-green-800 font-semibold mt-1 mr-2"/>Lowest-priced package</li>
            <li className="flex flex-row my-2"><RxCross1 className="text-red-800 font-semibold mt-2 mr-2"/>No refunds</li>
            <li className="flex flex-row my-2"><br></br></li>
          </ul>
          <div className="mt-8 mb-4 text-center">
            <OutlineButton color="violet-900" style="text-xl px-4" text="Subscribe now" link="https://buy.stripe.com/7sI2aZ43K1tqcGQdQS" target="_blank"/>
          </div>
        </Card>

        <Card header="1 hour coaching session" style="mx-auto">
          <div className="text-center">
            <span className="text-6xl font-semibold">100</span>
            <span className="text-xl font-normal ml-1">CAD</span>
            <div className="text-xl font-light ml-1 text-slate-500">per occasion</div>
          </div>
          <ul className="mt-8 px-2 text-lg font-semilight">
            <li className="flex flex-row my-2"><AiOutlineCheck className="text-green-800 font-semibold mt-1 mr-2"/>One on one traning or trade session</li>
            <li className="flex flex-row my-2"><AiOutlineCheck className="text-green-800 font-semibold mt-1 mr-2"/>Real time coaching via Skype</li>
            <li className="flex flex-row my-2"><AiOutlineCheck className="text-green-800 font-semibold mt-1 mr-2"/>One time payment</li>
            <li className="flex flex-row my-2"><RxCross1 className="text-red-800 font-semibold mt-2 mr-2"/>No refunds</li>
            <li className="flex flex-row my-2"><br></br></li>
          </ul>
          <div className="mt-8 mb-4 text-center">
            <OutlineButton color="violet-900" style="text-xl px-4" text="Buy now" link="https://buy.stripe.com/7sI2aZ43K1tqcGQdQS" target="_blank"/>
          </div>
        </Card>
      </DisplayCase>
      <h1 className="text-2xl lg:text-3xl text-center font-semibold mt-16 text-violet-700">All subscriptions are cancellable but not refundable!</h1>
    </Section>
  )
}

export function EightcapProfile() {
  return (
    <Section style="bg-violet-700 text-white">
      <h1 className="font-semibold text-2xl text-center lg:text-3xl">Sign up for an Eightcap account and pay the subscription fee, I will input you to my copier platform rightaway!</h1>
      <p className="text-white text-lg lg:text-xl font-semilight text-center my-10">Eightcap is my favorite broker platform. It&apos;s best to use the same broker as the master account. Different brokers have different spreads, leverages and commissions. By using the same broker, results are more consistent. This is recommended but not required. MT4 and MT5 accounts only. C-Trader is not supported.</p>
      <div className='w-fit mx-auto mt-10'>
          <OutlineButton color="white" style="mx-2 text-2xl border-2 hover:border-3 px-4" text="Join Eightcap now!" link="https://join.eightcap.com/visit/?bta=38222&brand=eightcap" target='_blank'/>
        </div>
    </Section>
  )
}

export function HistoryGallery() {
  // const months = ["Nov 2022", "Dec 2022", "Jan 2023", "Feb 2023", "Mar 2023", "Apr 2023"]
  const months = ["Nov 2022", "Dec 2022", "Mar 2023", "Apr 2023"]
  const [month, setMonth] = useState(0);
  const [showAll, setShowAll] = useState(false)
  const [lighBoxSrc, setLightBoxSrc] = useState('/img/stock-graph.jpg');
  const [lighBoxOpened, setLighBoxOpened] = useState(false);

  return (
    <Section style="border border-slate-300">
      <LightBox src={lighBoxSrc} opened={lighBoxOpened} closeFunc={() => {setLighBoxOpened(false)}}/>
      <h1 className="font-semibold text-4xl lg:text-6xl">History trades</h1>
      <p className="text-lg lg:text-2xl font-semilight mt-4">Click on the month to see trades for each month!</p>
      <div className="mt-12">
        {months.map((monthName, index) => (
          <TagButton key={monthName} text={monthName} active={month===index} style="mr-3" onClick={() => {setMonth(index); setShowAll(false);}}/>
        ))}
        <DisplayCase style={`mt-4 ${month === 0 ? '': 'hidden'}`}>
          <div className="relative border hover:border-2 border-black mt-8 w-72 h-128 mx-auto md:mx-3" onClick={() => {setLightBoxSrc("/img/history-trades/nov-1.jpg"); setLighBoxOpened(true);}}>
            <Image src="/img/history-trades/nov-1.jpg" alt="Stock graph" fill/>
          </div>
          <div className="relative border hover:border-2 border-black mt-8 w-72 h-128 mx-auto md:mx-3" onClick={() => {setLightBoxSrc("/img/history-trades/nov-2.jpg"); setLighBoxOpened(true);}}>
            <Image src="/img/history-trades/nov-2.jpg" alt="Stock graph" fill/>
          </div>
          <div className="relative border hover:border-2 border-black mt-8 w-72 h-128 mx-auto md:mx-3" onClick={() => {setLightBoxSrc("/img/history-trades/nov-3.jpg"); setLighBoxOpened(true);}}>
            <Image src="/img/history-trades/nov-3.jpg" alt="Stock graph" fill/>
          </div>
          <div className="relative border hover:border-2 border-black mt-8 w-72 h-128 mx-auto md:mx-3" onClick={() => {setLightBoxSrc("/img/history-trades/nov-4.jpg"); setLighBoxOpened(true);}}>
            <Image src="/img/history-trades/nov-4.jpg" alt="Stock graph" fill/>
          </div>
          <div className={`${showAll ? '' : 'hidden'} relative border hover:border-2 border-black mt-8 w-72 h-128 mx-auto md:mx-3`} onClick={() => {setLightBoxSrc("/img/history-trades/nov-5.jpg"); setLighBoxOpened(true);}}>
            <Image src="/img/history-trades/nov-5.jpg" alt="Stock graph" fill/>
          </div>
          <div className={`${showAll ? '' : 'hidden'} relative border hover:border-2 border-black mt-8 w-72 h-128 mx-auto md:mx-3`} onClick={() => {setLightBoxSrc("/img/history-trades/nov-6.jpg"); setLighBoxOpened(true);}}>
            <Image src="/img/history-trades/nov-6.jpg" alt="Stock graph" fill/>
          </div>
          <div className={`${showAll ? '' : 'hidden'} relative border hover:border-2 border-black mt-8 w-72 h-128 mx-auto md:mx-3`} onClick={() => {setLightBoxSrc("/img/history-trades/nov-7.jpg"); setLighBoxOpened(true);}}>
            <Image src="/img/history-trades/nov-7.jpg" alt="Stock graph" fill/>
          </div>
          <div className={`${showAll ? '' : 'hidden'} relative border hover:border-2 border-black mt-8 w-72 h-128 mx-auto md:mx-3`} onClick={() => {setLightBoxSrc("/img/history-trades/nov-8.jpg"); setLighBoxOpened(true);}}>
            <Image src="/img/history-trades/nov-8.jpg" alt="Stock graph" fill/>
          </div>
          <div className={`${showAll ? '' : 'hidden'} relative border hover:border-2 border-black mt-8 w-72 h-128 mx-auto md:mx-3`} onClick={() => {setLightBoxSrc("/img/history-trades/nov-9.jpg"); setLighBoxOpened(true);}}>
            <Image src="/img/history-trades/nov-9.jpg" alt="Stock graph" fill/>
          </div>
          <div className={`${showAll ? '' : 'hidden'} relative border hover:border-2 border-black mt-8 w-72 h-128 mx-auto md:mx-3`} onClick={() => {setLightBoxSrc("/img/history-trades/nov-10.jpg"); setLighBoxOpened(true);}}>
            <Image src="/img/history-trades/nov-10.jpg" alt="Stock graph" fill/>
          </div>
          <div className={`${showAll ? '' : 'hidden'} relative border hover:border-2 border-black mt-8 w-72 h-128 mx-auto md:mx-3`} onClick={() => {setLightBoxSrc("/img/history-trades/nov-11.jpg"); setLighBoxOpened(true);}}>
            <Image src="/img/history-trades/nov-11.jpg" alt="Stock graph" fill/>
          </div>
          <div className={`${showAll ? '' : 'hidden'} relative border hover:border-2 border-black mt-8 w-72 h-128 mx-auto md:mx-3`} onClick={() => {setLightBoxSrc("/img/history-trades/nov-12.jpg"); setLighBoxOpened(true);}}>
            <Image src="/img/history-trades/nov-12.jpg" alt="Stock graph" fill/>
          </div>
          <div className={`${showAll ? '' : 'hidden'} relative border hover:border-2 border-black mt-8 w-72 h-128 mx-auto md:mx-3`} onClick={() => {setLightBoxSrc("/img/history-trades/nov-13.jpg"); setLighBoxOpened(true);}}>
            <Image src="/img/history-trades/nov-13.jpg" alt="Stock graph" fill/>
          </div>
          <div className={`${showAll ? '' : 'hidden'} relative border hover:border-2 border-black mt-8 w-72 h-128 mx-auto md:mx-3`} onClick={() => {setLightBoxSrc("/img/history-trades/nov-14.jpg"); setLighBoxOpened(true);}}>
            <Image src="/img/history-trades/nov-14.jpg" alt="Stock graph" fill/>
          </div>
          <div className={`${showAll ? '' : 'hidden'} relative border hover:border-2 border-black mt-8 w-72 h-128 mx-auto md:mx-3`} onClick={() => {setLightBoxSrc("/img/history-trades/nov-15.jpg"); setLighBoxOpened(true);}}>
            <Image src="/img/history-trades/nov-15.jpg" alt="Stock graph" fill/>
          </div>
          <div className="relative bg-slate-200 hover:bg-slate-300 mt-8 w-72 h-128 mx-auto md:mx-3" onClick={() => {setShowAll(!showAll);}}>
            <p className="font-semibold text-xl absolute inset-0 m-auto w-fit h-fit">See {showAll ? 'less' : 'more'} ...</p>
          </div>
        </DisplayCase>
        <DisplayCase style={`mt-4 ${month === 1 ? '': 'hidden'}`}>
          <div className="relative border hover:border-2 border-black mt-8 w-72 h-128 mx-auto md:mx-3" onClick={() => {setLightBoxSrc("/img/history-trades/dec-1.jpg"); setLighBoxOpened(true);}}>
            <Image src="/img/history-trades/dec-1.jpg" alt="Stock graph" fill/>
          </div>
          <div className="relative border hover:border-2 border-black mt-8 w-72 h-128 mx-auto md:mx-3" onClick={() => {setLightBoxSrc("/img/history-trades/dec-2.jpg"); setLighBoxOpened(true);}}>
            <Image src="/img/history-trades/dec-2.jpg" alt="Stock graph" fill/>
          </div>
          <div className="relative border hover:border-2 border-black mt-8 w-72 h-128 mx-auto md:mx-3" onClick={() => {setLightBoxSrc("/img/history-trades/dec-3.jpg"); setLighBoxOpened(true);}}>
            <Image src="/img/history-trades/dec-3.jpg" alt="Stock graph" fill/>
          </div>
          <div className="relative border hover:border-2 border-black mt-8 w-72 h-128 mx-auto md:mx-3" onClick={() => {setLightBoxSrc("/img/history-trades/dec-4.jpg"); setLighBoxOpened(true);}}>
            <Image src="/img/history-trades/dec-4.jpg" alt="Stock graph" fill/>
          </div>
          <div className={`${showAll ? '' : 'hidden'} relative border hover:border-2 border-black mt-8 w-72 h-128 mx-auto md:mx-3`} onClick={() => {setLightBoxSrc("/img/history-trades/dec-5.jpg"); setLighBoxOpened(true);}}>
            <Image src="/img/history-trades/dec-5.jpg" alt="Stock graph" fill/>
          </div>
          <div className={`${showAll ? '' : 'hidden'} relative border hover:border-2 border-black mt-8 w-72 h-128 mx-auto md:mx-3`} onClick={() => {setLightBoxSrc("/img/history-trades/dec-6.jpg"); setLighBoxOpened(true);}}>
            <Image src="/img/history-trades/dec-6.jpg" alt="Stock graph" fill/>
          </div>
          <div className={`${showAll ? '' : 'hidden'} relative border hover:border-2 border-black mt-8 w-72 h-128 mx-auto md:mx-3`} onClick={() => {setLightBoxSrc("/img/history-trades/dec-7.jpg"); setLighBoxOpened(true);}}>
            <Image src="/img/history-trades/dec-7.jpg" alt="Stock graph" fill/>
          </div>
          <div className={`${showAll ? '' : 'hidden'} relative border hover:border-2 border-black mt-8 w-72 h-128 mx-auto md:mx-3`} onClick={() => {setLightBoxSrc("/img/history-trades/dec-8.jpg"); setLighBoxOpened(true);}}>
            <Image src="/img/history-trades/dec-8.jpg" alt="Stock graph" fill/>
          </div>
          <div className={`${showAll ? '' : 'hidden'} relative border hover:border-2 border-black mt-8 w-72 h-128 mx-auto md:mx-3`} onClick={() => {setLightBoxSrc("/img/history-trades/dec-9.jpg"); setLighBoxOpened(true);}}>
            <Image src="/img/history-trades/dec-9.jpg" alt="Stock graph" fill/>
          </div>
          <div className={`${showAll ? '' : 'hidden'} relative border hover:border-2 border-black mt-8 w-72 h-128 mx-auto md:mx-3`} onClick={() => {setLightBoxSrc("/img/history-trades/dec-10.jpg"); setLighBoxOpened(true);}}>
            <Image src="/img/history-trades/dec-10.jpg" alt="Stock graph" fill/>
          </div>
          <div className={`${showAll ? '' : 'hidden'} relative border hover:border-2 border-black mt-8 w-72 h-128 mx-auto md:mx-3`} onClick={() => {setLightBoxSrc("/img/history-trades/dec-11.jpg"); setLighBoxOpened(true);}}>
            <Image src="/img/history-trades/dec-11.jpg" alt="Stock graph" fill/>
          </div>
          <div className={`${showAll ? '' : 'hidden'} relative border hover:border-2 border-black mt-8 w-72 h-128 mx-auto md:mx-3`} onClick={() => {setLightBoxSrc("/img/history-trades/dec-12.jpg"); setLighBoxOpened(true);}}>
            <Image src="/img/history-trades/dec-12.jpg" alt="Stock graph" fill/>
          </div>
          <div className={`${showAll ? '' : 'hidden'} relative border hover:border-2 border-black mt-8 w-72 h-128 mx-auto md:mx-3`} onClick={() => {setLightBoxSrc("/img/history-trades/dec-13.jpg"); setLighBoxOpened(true);}}>
            <Image src="/img/history-trades/dec-13.jpg" alt="Stock graph" fill/>
          </div>
          <div className={`${showAll ? '' : 'hidden'} relative border hover:border-2 border-black mt-8 w-72 h-128 mx-auto md:mx-3`} onClick={() => {setLightBoxSrc("/img/history-trades/dec-14.jpg"); setLighBoxOpened(true);}}>
            <Image src="/img/history-trades/dec-14.jpg" alt="Stock graph" fill/>
          </div>
          <div className={`${showAll ? '' : 'hidden'} relative border hover:border-2 border-black mt-8 w-72 h-128 mx-auto md:mx-3`} onClick={() => {setLightBoxSrc("/img/history-trades/dec-15.jpg"); setLighBoxOpened(true);}}>
            <Image src="/img/history-trades/dec-15.jpg" alt="Stock graph" fill/>
          </div>
          <div className="relative bg-slate-200 hover:bg-slate-300 mt-8 w-72 h-128 mx-auto md:mx-3" onClick={() => {setShowAll(!showAll);}}>
            <p className="font-semibold text-xl absolute inset-0 m-auto w-fit h-fit">See {showAll ? 'less' : 'more'} ...</p>
          </div>
        </DisplayCase>
        <DisplayCase style={`mt-4 ${month === 2 ? '': 'hidden'}`}>
          <div className="relative border hover:border-2 border-black mt-8 w-72 h-128 mx-auto md:mx-3" onClick={() => {setLightBoxSrc("/img/history-trades/mar-1.jpg"); setLighBoxOpened(true);}}>
            <Image src="/img/history-trades/mar-1.jpg" alt="Stock graph" fill/>
          </div>
        </DisplayCase>
        <DisplayCase style={`mt-4 ${month === 3 ? '': 'hidden'}`}>
          <div className="relative border hover:border-2 border-black mt-8 w-72 h-128 mx-auto md:mx-3" onClick={() => {setLightBoxSrc("/img/history-trades/apr-1.jpg"); setLighBoxOpened(true);}}>
            <Image src="/img/history-trades/apr-1.jpg" alt="Stock graph" fill/>
          </div>
        </DisplayCase>
      </div>
    </Section>
  )
}

export function SocialMedia() {
  return (
    <Section>
      <h1 className="font-semibold text-4xl text-center lg:text-6xl">Follow us on social media</h1>
      <p className="text-2xl lg:text-3xl text-center mt-4">Ask questions, get the most recent news and trading tips. Join a community with like-minded people!</p>
      <div className="lg:flex lg:flex-row lg:justify-center mt-6 lg:mt-12">
        <div className="relative h-40vh lg:h-50vh w-80vw lg:w-30% max-w-lg mx-auto lg:mx-0 lg:mr-12">
          <Image src="/img/social-media.jpg" alt="Social medias" fill/>
        </div>
        <div className="mt-8 lg:mt-0 lg:w-1/2">
          <div className="flex flex-row">
            <div className="relative w-8 h-8">
              <Image src="/img/social-medias/gmail.png" alt="Gmail" fill/>
            </div>
            <a href="mailto:realfxcopier@gmail.com" className="ml-3 my-auto text-2xl">realfxcopier@gmail.com</a>
          </div>
          <p className="mt-4 text-lg">Feel free to send me emails to ask about anything. This is my main contact for business.</p>
          <div className="flex flex-row flex-wrap mt-6">
            <div className="relative w-8 h-8">
              <Image src="/img/social-medias/facebook.png" alt="Facebook" fill/>
            </div>
            <a href="https://www.facebook.com/profile.php?id=100086521276292" target="_blank" className="ml-3 my-auto text-2xl">https://www.facebook.com/profile.php?id=100086521276292</a>
          </div>
          <p className="mt-4 text-lg">I posted my trades once in a while on Facebook. I also will be posting some educational contents on Facebook some time in the future.</p>
          <div className="flex flex-row flex-wrap mt-6">
            <div className="relative w-8 h-8">
              <Image src="/img/social-medias/telegram.png" alt="Telegram" fill/>
            </div>
            <a href="https://t.me/+5yP9BXNmFtY0ZWEx" target="_blank" className="ml-3 my-auto text-2xl">https://t.me/+5yP9BXNmFtY0ZWEx</a>
          </div>
          <p className="mt-4 text-lg">Join the community, chat with me and other members to get real time update on daily trades.</p>
        </div>
      </div>
    </Section>
  )
}

export function ContactUs() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [content, setContent] = useState('');
  const [messageStatus, setMessageStatus] = useState('');
  const [disableSubmit, setDisableSubmit] = useState(false);

  const updateName = e => {
    setName(e.target.value);
  }

  const updateEmail = e => {
    setEmail(e.target.value);
  }

  const updateContent = e => {
    setContent(e.target.value);
  }

  const sendEmail = e => {
    e.preventDefault();
    setDisableSubmit(true);
    const templateParams = {
      name: name,
      email: email,
      content: content
    };
    
    try {
      emailjs.send(process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID, process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID, templateParams, process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY)
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        setMessageStatus('success');
      }, (err) => {
        console.log('FAILED...', err);
        setMessageStatus('failed');
        setDisableSubmit(false);
      });
    } catch (error){
      console.log(error)
      setDisableSubmit(false);
    }
    
    setName('');
    setEmail('');
    setContent(''); 
  }

  return (
    <Section style="bg-slate-100">
      <h1 className="font-semibold text-4xl lg:text-6xl text-center">Contact us</h1>
      <p className="text-2xl lg:text-3xl mt-2 lg:mt-4 text-center">Ask me anything!</p>
      <form onSubmit={sendEmail} className="flex flex-col mt-8 w-11/12 lg:w-10/12 xl:w-9/12 2xl:w-8/12 mx-auto">
        {messageStatus === 'success' ? <SuccessAlert heading="Message sent!" message="We will have a look at your message and send a reply to your email as soon as possible. Thank you!" style="mb-2"/> : <div></div>}
        {messageStatus === 'failed' ? <DangerAlert heading="Failed!" message="Failed to send a message. Please email us directly at realfxcopier@gmail.com to get support." style="mb-2"/> : <div></div>}
        <Input type="text" value={name} onChange={updateName} placeholder="Your name" style="shadow-md w-full lg:text-xl" required></Input>
        <Input type="email" value={email} onChange={updateEmail} placeholder="Your email" style="shadow-md mt-2 w-full lg:text-xl" required></Input>
        <Textarea value={content} onChange={updateContent} style="shadow-md mt-2 lg:text-xl" rows="10" placeholder="Describe how I can help you (Explain your needs, ask questions about a service, etc.)" required></Textarea>
        <Input type="submit" text="Submit" style={`mt-3 ${disableSubmit===false ? 'bg-violet-700 hover:bg-violet-800' : 'bg-violet-300'} text-white`} disabled={disableSubmit===true}></Input>
      </form>
    </Section>
  )
}

export function Testimonials({paramReviews=undefined}) {
  const [reviews, setReviews] = useState(paramReviews);
  const [reviewShown, setReviewShown] = useState(0);
  const [reviewFormOpened, setReviewFormOpened] = useState(false);

  useEffect(() => {
    if (paramReviews === undefined)  {
      fetch('api/review?' + new URLSearchParams({
        show: true
      }))
      .then(res => res.json())
      .then(data => {
        setReviews(data.reviews);
      })
    } else {
      setReviews(paramReviews.filter(review => review.show === true))
    }
  }, [paramReviews])

  if (reviews === undefined) {
    return (
      <div>Loading...</div>
    )
  } else {
    return (
      <section className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:px-8">
        <h1 className="font-semibold text-4xl lg:text-6xl text-center">Testimonials</h1>
        <p className="text-2xl lg:text-3xl mt-2 lg:mt-4 text-center">What our customers say about us!</p>
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)] opacity-20" />
        <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />
        <div className={`${reviewFormOpened === false ? '' : 'hidden'} mx-auto max-w-2xl lg:max-w-4xl mt-12`}>
          <CarouselButton side="left" style={`top-8 bottom-0 ${reviewShown === 0 || reviews.length === 0 ? 'hidden' : ''}`} onClick={() => {setReviewShown(reviewShown - 1)}}/>
          <CarouselButton side="right" style={`top-8 bottom-0 ${reviewShown === reviews.length - 1 || reviews.length === 0 ? 'hidden' : ''}`} onClick={() => {setReviewShown(reviewShown + 1)}}/>
          {reviews.length === 0 ? (
          <blockquote className="text-center text-xl font-semibold leading-8 text-gray-900 sm:text-2xl sm:leading-9">
            <p>
              No reviews yet. Be the first to leave us one!
            </p>
          </blockquote>
          ) : (<div>:</div>)}
          {reviews.map((review, index) => (
            <div key={review._id} className={`${reviewShown === index ? '' : 'hidden'}`}>
              <div className="text-center text-2xl text-violet-700 font-semibold">
                <p>ForexCopyTrade</p>
              </div>
              <figure className="mt-10 border-b border-slate-200 pb-5">
                <blockquote className="text-center text-xl font-semibold leading-8 text-gray-900 sm:text-2xl sm:leading-9">
                  <p>
                    {review.content}
                  </p>
                </blockquote>
                <div className="mt-5">
                  <div className="flex items-center justify-center space-x-3 text-base">
                    <div className="font-semibold text-gray-900">{review.firstName} {review.lastInitial}</div>
                    <svg viewBox="0 0 2 2" width={3} height={3} aria-hidden="true" className="fill-gray-900">
                      <circle cx={1} cy={1} r={1} />
                    </svg>
                    <div className="text-gray-600">from {review.country}</div>
                  </div>
                </div>
              </figure>
              {review.comment? (
                <figure className="mt-5">
                <blockquote className="text-center text-xl font-normal text-gray-900">
                  <p>{review.comment}</p>
                </blockquote>
                <div className="mt-5">
                  <div className="flex items-center justify-center space-x-3 text-base">
                    <div className="font-semibold text-gray-900">Robb</div>
                  </div>
                </div>
              </figure>
              ) : (<div></div>)}
            </div>
          ))}
        </div>:
        <div className="mx-auto max-w-xl lg:max-w-2xl mt-12">
          <TestimonialForm style={`${reviewFormOpened === true ? '' : 'hidden'}`}/>
        </div>
        <div className="text-center mt-12">
          {/* <OutlineButton color="violet-700" style="text-2xl border-2 hover:border-3 px-4" text="Leave us a review"/> */}
          <button className={`btn ${reviewFormOpened === false ? 'bg-violet-500 border-violet-500' : 'bg-violet-700 border-violet-700'} hover:bg-violet-900 hover:border-violet-900 text-xl border-2 hover:border-3 px-6`} onClick={() => {setReviewFormOpened(!reviewFormOpened)}}>Leave us a review</button>
        </div>
      </section>
    )
  }
  
}