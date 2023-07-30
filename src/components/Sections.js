import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import emailjs from '@emailjs/browser';
import imageCompression from 'browser-image-compression';
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import YouTube from "react-youtube";

import { OutlineButton, TagButton, CarouselButton } from '@/components/Buttons';
import { Section } from '@/components/PageLayouts';
import { DisplayCase, Card } from '@/components/Cards';
import { AiOutlineCheck, AiOutlinePlus } from 'react-icons/ai';
import { RxCross1 } from 'react-icons/rx';
import { LightBox, GalleryImage } from '@/components/ImageDisplays';
import { Input, Textarea, TestimonialForm } from '@/components/Forms';
import { SuccessAlert, DangerAlert } from '@/components/Alerts';
import {storage} from '../../lib/firebase';

export function Header({style=""}) {
  return (
    <section className={`w-full h-screen relative ${style}`}>
      <video autoPlay muted loop id="myVideo" poster='https://firebasestorage.googleapis.com/v0/b/forex-copier-trade.appspot.com/o/app_img%2Fstock-graph.jpg?alt=media&token=aa5ea75f-639a-4f29-9f4b-1b3825acfb8d' className='w-full h-full object-cover'>
        <source src="https://firebasestorage.googleapis.com/v0/b/forex-copier-trade.appspot.com/o/vid%2Fbg_vid0.mp4?alt=media&token=d7925834-07ef-4be2-901c-5cef11ad2759" type="video/mp4"/>
        Your browser does not support the video
      </video>
      {/* <div className="w-full h-full bg-black z-10 opacity-70 absolute top-0 left-0"></div> */}
      <div className="absolute z-20 h-fit inset-0 my-auto mx-auto text-center px-2">
        <h1 className="text-white font-semibold text-2xl sm:text-3xl md:text-4xl xl:text-6xl">Forex copy trading</h1>
        <p className='text-white text-lg lg:text-2xl mt-2'>What we professional traders gain, you gain the same!</p>
        <div className='w-fit mx-auto mt-10'>
          <Link target="_blank" href="https://join.eightcap.com/visit/?bta=38222&brand=eightcap" className="btn glass">Join Eightcap now!</Link>
          <Link target="_blank" href="/contact-us" className="btn glass mt-2 ml-2 sm:ml-4">Contact us</Link>
        </div>
      </div>
    </section>
  )
}

export function About() {
  return (
    <Section style="border-b-2 prose max-w-none">
      <h1 className="font-semibold text-4xl text-center lg:text-6xl">About me</h1>
      {/*<p className="text-2xl lg:text-3xl text-center mt-4">This is a placeholder for a slogan. The slogan is approximately this long!</p>*/}
      <div className="lg:flex lg:flex-row lg:justify-center mt-6 lg:mt-12">
        <div className="relative max-h-[50vh] w-80vw lg:w-45% max-w-md aspect-video mx-auto lg:mx-6">
          <Image src="https://firebasestorage.googleapis.com/v0/b/forex-copier-trade.appspot.com/o/app_img%2Fstock-laptop.jpg?alt=media&token=010f294b-611b-4fe2-83ff-dc49330f4b9a" alt="Stock graph" fill/>
        </div>
        <article className="mt-20 lg:mt-0 lg:w-1/2 lg:mx-6">
          <h2 className="text-2xl lg:text-4xl font-normal mt-8 lg:mt-0">Who am I?</h2>
          <p className="mt-4">I&apos;m just a simple guy that was looking to add income through investing. I went the traditional route and learned that the banks didn&apos;t have my best interests at heart. The same can be said for Forex brokers and the so-called “guru&apos;s”. All of them put on a great show telling you of fortunes to come. Pictures of high-end sports cars, fancy mansions, beautiful people surrounding them. Well guess what, none of that was true, the fancy indicators were just a selling point and relieved me of my money.  There&apos;s a reason 97% of traders fail.  I was one of those 97%.  However, after well over 100k in loss and reliance on indicators, I took time to figure it out and I now have a very tight grasp on it.  I don&apos;t have a 100%-win rate, (if someone tells you they do, they&apos;re lying) but then again, nobody does have a 100% win rate.  <strong className='text-xl'>My win rate is very good alongside good money management</strong>.  I learned some very valuable lessons, firstly the biggest was accepting loss and secondly to remove emotion.  I trade what I see and not what I hope could come true.  You can make money in forex, it takes time with small balances but it can be done.  I decided to offer this copy trade service so folks can see some positive results in their account as they learn, something that wasn&apos;t available when I was learning.  I encourage you to trade your own account alongside what I do.   
I decided to offer copy trade so folks can see some positive results in their account as they learn. (This was not available when I was learning) I encourage you to trade your own account alongside what I do.</p>
          <h2 className="text-2xl lg:text-4xl font-normal mt-8">Mission statement</h2>
          <p className="mt-4">
            We shoot for a gain of 1-10% each day markets are open. It&apos;s very possible to gain more but I prefer sticking to a strict set of rules. There are no guarantees given, this is meant to be a guide only. There will be days when the markets are flat and no trades take place, but we will be offering a better return on your money than any bank or financial adviser could give. Please remember, losses are a part of trading. You learn more from losses than you do wins. You have to be able to accept losses and not get emotional. If you bring emotions into trading, you&apos;re doomed to failure. If this is you, check out our VIP service, which is a great source of passive income as we trade for you. <strong className='text-xl'>The important thing is that we all move forward together, no matter where you are in your trading journey.</strong>
          </p>
          <h2 className="text-2xl lg:text-4xl font-normal mt-8">Exciting update</h2>
          <p className='mt-4'>
            I would like to welcome 2 new additions to the trading team. They both come with a proven track record of producing consistently profitable gains. One of them comes with a very good background of using fundamentals and institutional trading concepts. We are all different as each one of us trades using completely different strategies. But we are all here to help you learn as you go on your trading journey. We will be producing a course in the future, but in the mean time, you can benefit from one to one training sessions where all concepts will be explained in detail. We would ask if you would submit the topics that you wish to discuss by email at the time of booking. This allows us to work out who the best teacher is to meet your requirements.
          </p>
        </article>
      </div>
    </Section>
  )
}

export function Disclaimer() {
  return (
    <Section style="bg-violet-700 text-white !py-16">
      <h1 className="font-semibold text-2xl lg:text-4xl">Risk disclosure</h1>
      <p className="text-lg lg:text-xl font-semilight mt-8">
        Trading financial products of the companies featured on this site carries a high level of risk, including the risk of losing substantially more than your initial investment.  You should never invest money that you cannot afford to lose.  You should be aware of all the risks associated with foreign exchange trading and seek advice from an independent financial adviser if you have any doubts.
      </p>
    </Section>
  )
}

export function Service() {
  const services = [
    {
      'title': 'Base copier',
      'price': "80",
      'paymentFreq': 'per month',
      'pros': [
        'Real time trade mirrorings',
        'Access to a VIP Telegram community',
        '1 trader trades 1 session every day (8 hour)'
      ],
      'cons': [
        'No refund'
      ],
      'buttonText': 'Subscribe now',
      'buttonLink': 'https://checkout.stripe.com/c/pay/cs_live_a1SWw0v2NZATJsiO61liZ2e84YcurY8vgYJmLfF4wAWzFBBdy2KYiXyOcy#fidkdWxOYHwnPyd1blppbHNgWjA0SEZwVFJATFU2VjBSQm9nSUZRcldWTzNVb1dgTjZmcUdJT01mQ09VQWBLTmZzbUxCN3QybVF0d3d9c08zQ3B1QlR%2FcnA2a09VYVU9QG00fHVcfEBrZmhHNTU9a0ZcQzFvQScpJ3VpbGtuQH11anZgYUxhJz8nM2pAZ0l%2FZHY9NXVoMGBqYVRSJyknd2BjYHd3YHdKd2xibGsnPydtcXF1PyoqaWpmZGltanZxPzY1NTUqJ3gl'
    },
    {
      "title": "1 hour coaching session",
      "price": "100",
      "paymentFreq": "per occasion",
      "pros": [
        "One on one training or trade session",
        "Real time coaching via Skype",
        "One time payment"
      ],
      "cons": [
        "No refund"
      ],
      "buttonText": "Buy now",
      "buttonLink": "https://buy.stripe.com/7sI4j743Kb40fT2dQX"
    },
    {
      "title": "VIP copier",
      "price": "Coming soon",
      "paymentFreq": "",
      "pros": [
        "The new and exciting VIP package allows people who have no trading experience to dip their toe into investing whilst knowing that their money is in safe hands. Also it is suited to traders who do not have time to be looking at charts due to work or family commitments but are keen to still be involved in trading, let us do it for you. You will require a minimum balance of $1440 Canadian dollars or 1000 Euro. You will not be able to trade this account until you have a balance of 4K, the reason for this is that our traders have a good win percentage, we do not want this altered my people trading, messing it up and then leaving bad reviews. This is great passive income, deposit the money and watch your balance grow. VIP costs more because we are giving you access to the traders in our team with the highest win percentage."
      ],
      "cons": [],
      "buttonText": "",
      "buttonLink": ""
    },
    {
      "title": "Premium copier",
      "price": "Coming soon",
      "paymentFreq": "",
      "pros": [
        "Coming soon! Stay tuned!"
      ],
      "cons": [],
      "buttonText": "",
      "buttonLink": ""
    }
  ]

  return (
    <Section>
      <h1 className="font-semibold text-4xl lg:text-6xl">Our services</h1>
      {/* <p className="text-lg lg:text-2xl font-semilight mt-4">Our company provides the following services. Feel free to email us at <a href="mailto:realfxcopier@gmail.com" className="underline text-blue-700">realfxcopier@gmail.com</a> if you have any question about any service!</p> */}
      <h1 className="text-2xl lg:text-3xl text-center font-semibold mt-16 text-violet-700">
        All these services are pre-launched and the prices can go up later. Subscribe early to get the most out of your money. Note, all subscriptions are cancellable but not refundable!
      </h1>
      <DisplayCase style="mt-4 justify-center">
        {services.map((service, index) => (
          <Card key={index} header={service.title} style="mx-auto min-h-[500px]">
            <div className="text-center">
              <span className="text-6xl font-semibold">{service.price}</span>
              {!isNaN(service.price) ? (<span className="text-xl font-normal ml-1">CAD</span>) : null}
              <div className="text-xl font-light ml-1 text-slate-500">{service.paymentFreq}</div>
            </div>
            <ul className="mt-8 px-2 text-lg font-semilight">
              {service.pros.map((pro, proIndex) => (
                <li key={proIndex} className="flex flex-row my-2"><AiOutlineCheck className="text-green-800 font-semibold mt-1 mr-2"/>{pro}</li>
              ))}
              {service.cons.map((con, conIndex) => (
                <li key={conIndex} className="flex flex-row my-2"><RxCross1 className="text-red-800 font-semibold mt-2 mr-2"/>{con}</li>
              ))}
              <li className="flex flex-row my-2"><br></br></li>
            </ul>
            {service.buttonText ? (<div className="mt-8 mb-4 text-center">
              <OutlineButton color="violet-900" style="text-xl px-4" text={service.buttonText} link={service.buttonLink} target="_blank"/>
            </div>) : null}
          </Card>
        ))}
      </DisplayCase>
      <p className="text-lg font-semilight mt-12">To get started,
        pay the subscription and send us an email with a screenshot of payment as confirmation.
        From there, we will gather your MT4 information, input it into the system, and away you go.
        We don&apos;t recommend lot sizes or account balances. We do recommend a higher leverage for smaller balance accounts. Any question can be sent to <a href="mailto:realfxcopier@gmail.com" className="underline text-blue-700">realfxcopier@gmail.com</a>!
      </p>
      <h1 className="text-2xl lg:text-3xl text-center font-semibold mt-16 text-violet-700">
        Stay tuned for our new upcoming pool account! Our pool account is a small 3 month term investment account with equal profit share. Stay tuned for developments.
      </h1>
    </Section>
  );
}

export function EightcapProfile() {
  return (
    <Section style="bg-violet-700 text-white">
      <h1 className="font-semibold text-2xl text-center lg:text-3xl">Sign up today and begin your journey!</h1>
      <p className="text-white text-lg lg:text-xl font-semilight text-center my-10">Eightcap is our <strong>preferred</strong> broker. We recommend using this broker as it is the master account brokerage. It&apos;s best to use the same broker as the master account. Different brokers have different spreads, leverages and commissions. By using the same broker, results are more consistent. This is recommended but not required. MT4 and MT5 accounts only. C-Trader is not supported.</p>
      <div className='w-fit mx-auto mt-10'>
          <OutlineButton color="white" style="mx-2 text-lg sm:text-xl border-2 hover:border-3 px-4" text="Join Eightcap now!" link="https://join.eightcap.com/visit/?bta=38222&brand=eightcap" target='_blank'/>
        </div>
    </Section>
  )
}

export function HistoryGallery({style="", edit=false, initialImages=[], initialMonths=[]}) {
  const [historyImages, setHistoryImages] = useState(initialImages);
  const [months, setMonths] = useState(initialMonths);
  const [month, setMonth] = useState(0);
  const [showAll, setShowAll] = useState(false)
  const [lighBoxSrc, setLightBoxSrc] = useState('');
  const [lighBoxOpened, setLighBoxOpened] = useState(false);

  // For editing
  const [newImageMonth, setNewImageMonth] = useState(0);
  const [monthTagInput, setMonthTagInput] = useState(false);
  const [newMonth, setNewMonth] = useState('');
  const [newImage, setNewImage] = useState(null);
  const [fileDataURL, setFileDataURL] = useState(null);
  const imageMimeType = /image\/(png|jpg|jpeg)/i;
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // For image deletion
  const [imageSelectMode, setImageSelectMode] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);

  useEffect(() => {
    fetch('api/history_image')
    .then(res => res.json())
    .then(data => {
      if (data.historyImages) {
        setHistoryImages(data.historyImages);
        let historyMonths = []
        data.historyImages.forEach(rec => {
          historyMonths.push(rec.month);
        })
        setMonths(historyMonths);
      }
    })
  }, [])

  useEffect(() => {
    if (edit) {
      let fileReader, isCancel = false;
      if (newImage) {
        fileReader = new FileReader();
        fileReader.onload = (e) => {
          const { result } = e.target;
          if (result && !isCancel) {
            setFileDataURL(result)
          }
        }
        fileReader.readAsDataURL(newImage);
      }
      return () => {
        isCancel = true;
        if (fileReader && fileReader.readyState === 1) {
          fileReader.abort();
        }
      }
    }
  }, [newImage]);
  
  const updateNewMonth = e => {
    setNewMonth(e.target.value);
  }

  const updateNewImage = async (e) => {
    const file = e.target.files[0];
    if (!file.type.match(imageMimeType)) {
      alert("Image mime type is not valid");
      return;
    }
    const options = {
      maxSizeMB: 0.1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    }
    try {
      const compressedImage = await imageCompression(file, options);
      setNewImage(compressedImage);
    } catch (error) {
      console.log(error);
    }
  }

  const addMonthTag = e => {
    e.preventDefault();
    setMonths(
      [...months, newMonth]
    )
    setHistoryImages(
      [...historyImages, {
        month: newMonth,
        images: []
      }]
    )
    setNewMonth('');
    setMonthTagInput(false);
    setNewImageMonth(months.length);
  }

  const uploadNewImage = e => {
    e.preventDefault();
    const imageRef = ref(storage, `history/${months[newImageMonth]}_${new Date().getTime()}.jpg`);
    // 'file' comes from the Blob or File API
    uploadBytes(imageRef, newImage).then((snapshot) => {
      getDownloadURL(imageRef).then(url => {
        setNewImage(null);
        setFileDataURL(null);
        document.getElementById('add-image-modal').checked = false;
        document.getElementById('image-input').value = "";
        fetch('/api/history_image', {
          method: "POST",
          mode: "cors",
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            month: months[newImageMonth],
            imageURL: url
          })
        })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setSuccessMessage("Uploaded image successfully");
            let monthFound = false;
            let newHistoryImages = historyImages;
            for (let i=0; i<newHistoryImages.length; i++) {
              if (newHistoryImages[i].month === months[newImageMonth]) {
                newHistoryImages[i].images.push(url);
                monthFound = true;
              }
            }
            if (!monthFound) {
              newHistoryImages.push({
                month: months[newImageMonth],
                images: [url]
              })
              setMonths([...months, newImageMonth])
            }
            setHistoryImages(newHistoryImages);
            setTimeout(() => {setSuccessMessage('')}, 5000);
          } else {
            setErrorMessage("Failed to upload image");
            setTimeout(() => {setErrorMessage('')}, 5000);
          }
        })
      })
    });
  }

  const toggleImageSelectionForDeletion = (month, url) => {
    let imageSelected = false;
    selectedImages.forEach(item => {
      if (item[0] === month && item[1] === url) {
        imageSelected = true;
      }
    });
    if (imageSelected) {
      setSelectedImages(selectedImages.filter(item => item[0] !== month || item[1] !== url))
    } else {
      setSelectedImages([...selectedImages, [month, url]])
    }
  }

  const deleteSelectedImages = () => {
    let deletedImageObj = {};
    selectedImages.forEach(item => {
      if (item[0] in deletedImageObj) {
        deletedImageObj[item[0]].push(item[1]);
      } else {
        deletedImageObj[item[0]] = [item[1]];
      }
    })
    fetch('/api/history_image', {
      method: "POST",
      mode: "cors",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        deletedImages: deletedImageObj
      })
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        for (const [_, url] of selectedImages) {
          const imageRef = ref(storage, url);
          deleteObject(imageRef).then(() => {
            setSuccessMessage("Deleted images successfully");
            setTimeout(() => {setSuccessMessage('')}, 5000);
            setHistoryImages(data.historyImages);
            let historyMonths = [];
            data.historyImages.forEach(rec => {
              historyMonths.push(rec.month);
            })
            setMonths(historyMonths);
            if (historyMonths.length <= month) {
              setMonth(0);
            }
            setImageSelectMode(false);
            setSelectedImages([]);
            document.getElementById('delete-image-modal').checked = false;
          }).catch((error) => {
            console.log("Failed to delete image from Firebase storage");
            console.log(error);
            setErrorMessage("Failed to delete images");
            setTimeout(() => {setErrorMessage('')}, 5000);
          })
        }
        
      } else {
        console.log("Failed to delete images from MongoDB");
        setErrorMessage("Failed to delete images");
        setTimeout(() => {setErrorMessage('')}, 5000);
      }
    })
  }

  return (
    <Section style={`border border-slate-300 ${style}`}>
      <LightBox src={lighBoxSrc} opened={lighBoxOpened} closeFunc={() => {setLighBoxOpened(false)}}/>
      <h1 className="font-semibold text-4xl lg:text-6xl">History trades</h1>
      <p className="text-lg lg:text-2xl font-semilight mt-4">Click on the month to see trades for each month!</p>
      {edit ? (
      <div className="mt-4">
        <label htmlFor="add-image-modal" className="btn">Add image</label>
        <input type="checkbox" id="add-image-modal" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Add an image to history gallery</h3>
            <form className="mt-4 text-md" onSubmit={uploadNewImage}>
              <label>Month tag:</label>
              <div className="mt-1">
                {months.map((monthName, index) => (
                  <TagButton key={monthName} text={monthName} active={newImageMonth===index} style="!text-sm mr-2 mt-1" onClick={() => {setNewImageMonth(index)}}/>
                ))}
                <TagButton text="Add tag +" active={monthTagInput} style="!text-sm mr-2 mt-1" onClick={() => {setMonthTagInput(!monthTagInput)}}/>
              </div>
              <div className={`form-control mt-3 ${monthTagInput ? '' : 'hidden'}`}>
                <div className="input-group">
                  <input type="text" placeholder="Input month name" className="input input-bordered" value={newMonth} onChange={updateNewMonth}/>
                  <button className={`btn btn-square ${newMonth === '' ? 'btn-disabled' : ''}`} onClick={addMonthTag}>
                    <AiOutlinePlus size={20}/>
                  </button>
                </div>
              </div>
              <div className="mt-3 italic">Select the month when this picture was taken</div>
              <div className="mt-3">
                <label>New image:</label>
                <input id="image-input" type="file" accept=".png, .jpg, .jpeg" className="form-control mt-1 file-input file-input-bordered w-full max-w-xs" onChange={updateNewImage}/>
              </div>
              {fileDataURL ?
              <div>
                { 
                <div className='relative w-60 h-[21rem] mt-3 mx-auto'>
                  <Image src={fileDataURL} alt="preview" fill/>
                </div>
                }
              </div> : null}
              <div className="modal-action">
                <label htmlFor="add-image-modal" className="btn btn-error text-white hover:bg-red-600">Cancel</label>
                <input type="submit" className={`btn ${newImage === null ? "btn-disabled": ""}`} value="Submit"/>
              </div>
            </form>
          </div>
        </div>
        
        <div className={`btn btn-error hover:bg-red-600 text-white ml-2 ${!imageSelectMode ? "": "hidden"}`} onClick={() => {setImageSelectMode(true)}}>Delete images</div>
        <div className={`btn btn-error hover:bg-red-600 text-white ml-2 ${imageSelectMode && selectedImages.length === 0 ? "": "hidden"}`} onClick={() => {setImageSelectMode(false)}}>Cancel deleting images</div>
        <label htmlFor="delete-image-modal" className={`btn btn-error hover:bg-red-600 text-white ml-2 ${imageSelectMode && selectedImages.length > 0 ? "": "hidden"}`}>Delete selected images ({selectedImages.length})</label>
        <p className={`text-lg italic mt-2 ${imageSelectMode ? "": "hidden"}`}>Click on an image to select that image for deletion</p>
        <input type="checkbox" id="delete-image-modal" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Confirm deleting images</h3>
            <p className="py-4">Are you sure you want to delete the {selectedImages.length} images that you selected?</p>
            <div className="modal-action">
              <label htmlFor="delete-image-modal" className="btn btn-error text-white">No</label>
              <div className="btn" onClick={deleteSelectedImages}>Yes</div>
            </div>
          </div>
        </div>

        {successMessage !== '' ? <div className="toast z-40">
          <div className="alert alert-success">
            <div>
              <span>{successMessage}</span>
            </div>
          </div>
        </div> : null}
        {errorMessage !== '' ? <div className="toast z-40">
          <div className="alert alert-error">
            <div>
              <span>{errorMessage}</span>
            </div>
          </div>
        </div> : null}
      </div>) : (<div></div>)}
      <div className="mt-12">
        {months.map((monthName, index) => historyImages.length > 0 ? (
          <TagButton key={monthName} text={monthName} active={month===index} style="mr-3 mt-1" onClick={() => {setMonth(index); setShowAll(false);}}/>
        ) : null)}
        {months.map((monthName, index) => historyImages.length > 0 ? (
          <DisplayCase key={index} style={`mt-4 ${index === month ? '': 'hidden'}`}>
            {historyImages.filter(rec => rec.month === monthName)[0].images.map((imageURL, imageIndex) => (
              <div key={imageURL} className={`${!showAll && imageIndex > 3 ? 'hidden' : ''}`}>
                <GalleryImage src={imageURL} style={`mt-8 w-60 h-96 sm:w-72 sm:h-128 mx-auto md:mx-3 ${!imageSelectMode ? "" : "hidden"}`} onClick={() => {setLightBoxSrc(imageURL); setLighBoxOpened(true);}}/>
                <GalleryImage src={imageURL} selectedMode style={`mt-8 w-72 h-128 mx-auto md:mx-3 ${imageSelectMode ? "" : "hidden"}`} onClick={() => {toggleImageSelectionForDeletion(monthName, imageURL)}}/>
              </div>
            ))}
            {historyImages.filter(rec => rec.month === monthName)[0].images.length > 4 ? (<div className="relative bg-slate-200 hover:bg-slate-300 mt-8 w-60 h-96 sm:w-72 sm:h-128 mx-auto md:mx-3" onClick={() => {setShowAll(!showAll);}}>
              <p className="font-semibold text-xl absolute inset-0 m-auto w-fit h-fit">See {showAll ? 'less' : 'more'} ...</p>
            </div>) : null}
          </DisplayCase>
        ) : null)}
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
          <Image src="https://firebasestorage.googleapis.com/v0/b/forex-copier-trade.appspot.com/o/app_img%2Fsocial-media.jpg?alt=media&token=9fe03154-ef44-4cd0-b70e-2c1941f9f440" alt="Social medias" fill/>
        </div>
        <div className="mt-8 lg:mt-0 lg:w-1/2">
          <div className="flex flex-row">
            <div className="relative w-8 h-8">
              <Image src="https://firebasestorage.googleapis.com/v0/b/forex-copier-trade.appspot.com/o/app_img%2Fgmail.png?alt=media&token=fda120db-128c-45ac-ac52-7acaa83d0513" alt="Gmail" fill/>
            </div>
            <a href="mailto:realfxcopier@gmail.com" className="ml-3 my-auto text-2xl">realfxcopier@gmail.com</a>
          </div>
          <p className="mt-4 text-lg">Feel free to send me emails to ask about anything. This is my main contact for business.</p>
          <div className="flex flex-row flex-wrap mt-6">
            <div className="relative w-8 h-8">
              <Image src="https://firebasestorage.googleapis.com/v0/b/forex-copier-trade.appspot.com/o/app_img%2Ffacebook.png?alt=media&token=8a22bd05-7c7a-4218-b6d3-cd21c43ab22c" alt="Facebook" fill/>
            </div>
            <a href="https://www.facebook.com/profile.php?id=100086521276292" target="_blank" className="ml-3 my-auto text-2xl">https://www.facebook.com/profile.php?id=100086521276292</a>
          </div>
          <p className="mt-4 text-lg">I posted my trades once in a while on Facebook. I also will be posting some educational contents on Facebook some time in the future.</p>
          <div className="flex flex-row flex-wrap mt-6">
            <div className="relative w-8 h-8">
              <Image src="https://firebasestorage.googleapis.com/v0/b/forex-copier-trade.appspot.com/o/app_img%2Ftelegram.png?alt=media&token=cd0a4770-a770-4006-af5d-287a49f3ced2" alt="Telegram" fill/>
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

export function Testimonials() {
  const [reviews, setReviews] = useState(undefined);
  const [reviewShown, setReviewShown] = useState(0);
  const [reviewFormOpened, setReviewFormOpened] = useState(false);

  useEffect(() => {
    fetch('api/review?' + new URLSearchParams({
      show: true
    }))
    .then(res => res.json())
    .then(data => {
      setReviews(data.reviews);
    })
  }, [])

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

export function Members() {
  return (
    <Section>
      <h1 className="font-semibold text-3xl text-center xl:text-4xl">Avaiable ONLY to subscribers</h1>
      <p className="text-xl lg:text-2xl text-center mt-4">See live trading in action, ask and receive real-time answers, join a community of like-minded people!</p>
      <div className="flex flex-row flex-wrap mt-10">
        <div className="relative w-8 h-8">
          <Image src="https://firebasestorage.googleapis.com/v0/b/forex-copier-trade.appspot.com/o/app_img%2Ftelegram.png?alt=media&token=cd0a4770-a770-4006-af5d-287a49f3ced2" alt="Telegram" fill/>
        </div>
        <a href="https://t.me/+5yP9BXNmFtY0ZWEx" target="_blank" className="ml-3 my-auto text-2xl">https://t.me/+5yP9BXNmFtY0ZWEx</a>
      </div>
      {/* <p className="mt-4 text-lg">Join the community, chat with me and other members to get real time update on daily trades.</p> */}
    </Section>
  )
}

export function Products() {
  const [types, setTypes] = useState([
    {
      'id': 1,
      'title': 'Spike',
    },
    {
      'id': 2,
      'title': 'Sneaky Pete',
    },
    {
      'id': 3,
      'title': 'Quickening',
    },
  ])
  const [products, setProducts] = useState([
    {
      'name': 'Spike indicator',
      'price': 200,
      'buttonText': 'Buy now',
      'buttonLink': 'https://buy.stripe.com/3cs8zn7fW8VS4ak3cl',
      'type': 1
    },
    {
      'name': 'Spike EA (robot)',
      'price': 275,
      'buttonText': 'Buy now',
      'buttonLink': 'https://buy.stripe.com/eVa7vj1VCegcdKU6oy',
      'type': 1
    },
    {
      'name': 'Spike indicator and ea package',
      'price': 450,
      'buttonText': 'Buy now',
      'buttonLink': 'https://buy.stripe.com/aEUdTHdEkdc84ak4gr',
      'type': 1
    },
    {
      'name': 'Sneaky Pete indicator',
      'price': 200,
      'buttonText': 'Buy now',
      'buttonLink': 'https://buy.stripe.com/14kcPDgQw3BygX6eV2',
      'type': 2
    },
    {
      'name': 'Sneaky Pete EA',
      'price': 275,
      'buttonText': 'Buy now',
      'buttonLink': 'https://buy.stripe.com/3csaHv0Ryegc5eobIU',
      'type': 2
    },
    {
      'name': 'Sneaky Pete indicator and EA package',
      'price': 450,
      'buttonText': 'Buy now',
      'buttonLink': 'https://buy.stripe.com/9AQ16V9o4gokbCMdR3',
      'type': 2
    },
    {
      'name': 'Quickening Indicator',
      'price': 150,
      'buttonText': 'Buy now',
      'buttonLink': 'https://buy.stripe.com/5kAbLzgQwdc8fT2fZc',
      'type': 3
    },
    {
      'name': 'Quickening EA',
      'price': 200,
      'buttonText': 'Buy now',
      'buttonLink': 'https://buy.stripe.com/00g9Dr8k0dc84ak3cr',
      'type': 3
    },
    {
      'name': 'Indicator and ea package',
      'price': 325,
      'buttonText': 'Buy now',
      'buttonLink': 'https://buy.stripe.com/14kbLz0Rydc8gX628o',
      'type': 3
    },
  ])

  return (
    <Section style='!px-8 lg:!px-24 bg-slate-50'>
      <h1 className="font-semibold text-center text-2xl sm:text-3xl lg:text-5xl">EA&apos;s and indicators</h1>
      <p className="text-lg sm:text-xl lg:text-2xl text-center mt-2">EA pricing is introductory and will go up</p>
      {types.map((type, typeIndex) => (
        <div key={typeIndex}>
          <h1 className='mt-8 font-semibold text-2xl lg:text-4xl ml-[4%] lg:ml-0'>{type.title}</h1>
          <div className="flex flex-row flex-wrap">
          {products.map((product, index) => product.type === type.id ? (
            <div key={index} className='p-8 shadow-lg w-[90%] mx-auto lg:w-[47%] lg:ml-0 min-w-[200px] min-h-[150px] border border-slate-100 my-4 bg-white'>
              <h3 className='text-xl sm:text-2xl font-semibold'>{product.name}</h3>
              <h1 className='text-2xl sm:text-4xl font-bold mt-2'>{product.price}</h1>
              <Link href={product.buttonLink} target='_blank' className="btn btn-outline btn-primary mt-4">{product.buttonText}</Link>
            </div>
          ) : null)}
          </div>
        </div>
      ))}
      {/* <div className="flex flex-row flex-wrap mt-8">
        {products.map((product, index) => (
          <div key={index} className='p-8 shadow-lg w-[90%] mx-auto lg:w-[47%] lg:ml-0 min-w-[200px] min-h-[150px] border border-slate-100 mt-8 bg-white'>
            <h3 className='text-2xl font-semibold'>{product.name}</h3>
            <h1 className='text-4xl font-bold mt-2'>{product.price}</h1>
            <Link href={product.buttonLink} target='_blank' className="btn btn-outline btn-primary mt-4">{product.buttonText}</Link>
          </div>
        ))}
      </div> */}
      <p className="text-lg lg:text-xl font-semilight mt-12 text-center mx-8">
        Indicators and EA&apos;s are tools to assist in trading ventures and should not be considered a guarantee of success. No guarantees are implied or given. 
        <strong> All sales are final and no refunds!</strong>
      </p>
    </Section>
  )
}

export function TradesInAction() {
  const onPlayerReady = (event) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }
  
  const opts = {
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <Section>
      <h1 className="font-semibold text-center text-3xl lg:text-5xl">Spike in action</h1>
      <YouTube videoId="-gsEozarhbc" opts={opts} iframeClassName='w-11/12 h-[300px] md:h-[500px] max-w-[900px] mx-auto mt-12' onReady={onPlayerReady} loading='lazy'/>
    </Section>
  )
}