import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import emailjs from '@emailjs/browser';
import imageCompression from 'browser-image-compression';
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";

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
    <section className={`w-full h-25vh relative ${style}`}>
      <video autoPlay muted loop id="myVideo" poster='https://firebasestorage.googleapis.com/v0/b/forex-copier-trade.appspot.com/o/app_img%2Fstock-graph.jpg?alt=media&token=aa5ea75f-639a-4f29-9f4b-1b3825acfb8d' className='w-full'>
        <source src="https://firebasestorage.googleapis.com/v0/b/forex-copier-trade.appspot.com/o/vid%2Fbg_vid0.mp4?alt=media&token=d7925834-07ef-4be2-901c-5cef11ad2759" type="video/mp4"/>
        Your browser does not support the video
      </video>
      <div className="w-full h-full bg-black z-10 opacity-70"></div>
      <div className="absolute z-20 h-fit inset-0 my-auto mx-auto text-center px-2">
        <h1 className="text-white font-semibold text-4xl lg:text-6xl">Forex copy trading</h1>
        <p className='text-white text-lg lg:text-2xl mt-2'>What we professional traders gain, you gain the same!</p>
        <div className='w-fit mx-auto mt-6'>
          <Link target="_blank" href="https://join.eightcap.com/visit/?bta=38222&brand=eightcap" className="btn glass">Join Eightcap now!</Link>
          <Link target="_blank" href="/contact-us" className="btn glass ml-4">Contact us</Link>
        </div>
      </div>
    </section>
  )
}

export function About() {
  return (
    <Section style="border-b-2">
      <h1 className="font-semibold text-4xl text-center lg:text-6xl">About me</h1>
      {/*<p className="text-2xl lg:text-3xl text-center mt-4">This is a placeholder for a slogan. The slogan is approximately this long!</p>*/}
      <div className="lg:flex lg:flex-row lg:justify-center mt-6 lg:mt-12">
        <div className="relative h-40vh lg:h-50vh w-80vw lg:w-45% max-w-xl mx-auto lg:mx-6">
          <Image src="https://firebasestorage.googleapis.com/v0/b/forex-copier-trade.appspot.com/o/app_img%2Fstock-laptop.jpg?alt=media&token=010f294b-611b-4fe2-83ff-dc49330f4b9a" alt="Stock graph" fill/>
        </div>
        <div className="lg:w-1/2 lg:mx-6">
          <h2 className="text-2xl lg:text-4xl font-normal mt-8 lg:mt-0">Who am I?</h2>
          <p className="mt-4">I&apos;m just a simple guy that was looking to add income through investing.  I went the traditional route and learned that the banks didn&apos;t have my best interests at heart. The same can be said for Forex brokers and the so-called “guru&apos;s”. All of them put on a great show telling you of fortunes to come. Pictures of high-end sports cars, fancy mansions, beautiful people surrounding them.  Well guess what, none of that was true.  The fancy indicators were just a selling point and relieved me of my money.  There&apos;s a reason 97% of traders fail.  I was one of those 97%.  However, after well over 100k in loss and reliance on indicators, I took time to figure it out and I now have a very tight grasp on it.  I don&apos;t have a 100%-win rate, (if someone tells you they do, they&apos;re lying) but then again, nobody does have a 100% win rate.  <strong className='text-xl'>My win rate is very good alongside good money management</strong>.  I learned some very valuable lessons, firstly the biggest was accepting loss and secondly to remove emotion.  I trade what I see and not what I hope could come true.  You can make money in forex, it takes time with small balances but it can be done.  I decided to offer this copy trade service so folks can see some positive results in their account as they learn, something that wasn	&apos;t available when I was learning.  I encourage you to trade your own account alongside what I do.   
I decided to offer copy trade so folks can see some positive results in their account as they learn. (This was not available when I was learning) I encourage you to trade your own account alongside what I do.</p>
          <h2 className="text-2xl lg:text-4xl font-normal mt-8">Mission statement</h2>
          <p className="mt-4">We shoot for a gain of 1-10% each day markets are open.  It’s very possible to gain more but I prefer sticking to a strict set of rules.  It’s still a better return than any bank or financial planner will give you. Remember, losses are a factor so be prepared and accept it. <strong className='text-xl'>As long as we are going forward in the long run.</strong></p>
        </div>
      </div>
    </Section>
  )
}

export function Disclaimer() {
  return (
    <Section style="bg-violet-700 text-white !py-16">
      <h1 className="font-semibold text-2xl lg:text-4xl">Risk disclosure</h1>
      <p className="text-lg lg:text-xl font-semilight mt-8">
        Trading financial products of the companies featured on this site carries a high level of risk, including the risk of losing substantially more than your initial investment.  You should never invest money that you cannot afford to lose.  You should be aware of all the risks associated with foreign exchange trading and seek advice from an independent financial advisor if you have any doubts.
      </p>
    </Section>
  )
}

export function OldService({edit=false, initialServices}) {
  const [services, setServices] = useState(initialServices ? initialServices : undefined);

  const [title, setTitle] = useState('');
  const [price, setPrice] = useState(80);
  const [paymentFreq, setPaymentFreq] = useState('');
  const [pros, setPros] = useState([]);
  const [newPro, setNewPro] = useState('');
  const [cons, setCons] = useState([]);
  const [newCon, setNewCon] = useState('');
  const [buttonText, setButtonText] = useState('');
  const [buttonLink, setButtonLink] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [deleteTitle, setDeleteTitle] = useState('');
  const [deleteId, setDeleteId] = useState('');

  // useEffect(() => {
  //   fetch('/api/service')
  //   .then(res => res.json())
  //   .then(data => {
  //     if (data.success) {
  //       setServices(data.services);
  //     } else {
  //       setErrorMessage("Failed to fetch services");
  //       setTimeout(() => {setErrorMessage('')}, 5000);
  //     }
  //   })
  // }, [])

  const resetStates = () => {
    setTitle('');
    setPrice(80);
    setPaymentFreq('');
    setPros([]);
    setCons([]);
    setButtonText('');
    setButtonLink('');
  }

  const updateTitle = e => {
    setTitle(e.target.value);
  }

  const updatePrice = e => {
    setPrice(e.target.value);
  }

  const updatePaymentFreq = e => {
    setPaymentFreq(e.target.value);
  }

  const updateNewPro = e => {
    setNewPro(e.target.value);
  }

  const updateNewCon = e => {
    setNewCon(e.target.value);
  }

  const updateButtonText = e => {
    setButtonText(e.target.value);
  }

  const updateButtonLink = e => {
    setButtonLink(e.target.value);
  }

  const addPro = e => {
    e.preventDefault();
    setPros([...pros, newPro]);
    setNewPro('');
  }

  const removePro = pro => {
    setPros(pros.filter(proItem => proItem !== pro))
  }

  const addCon = e => {
    e.preventDefault();
    setCons([...cons, newCon]);
    setNewCon('');
  }

  const removeCon = con => {
    setCons(cons.filter(conItem => conItem !== con))
  }

  const addService = e => {
    e.preventDefault();
    const newService = {
      title: title,
      price: price,
      paymentFreq: paymentFreq,
      pros: pros,
      cons: cons,
      buttonText: buttonText,
      buttonLink: buttonLink
    }
    fetch('/api/service', {
      method: "POST",
      mode: "cors",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        newService: newService
      })
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        setServices(data.services);
        resetStates();
        setSuccessMessage("Added service successfully");
        setTimeout(() => {setSuccessMessage('')}, 5000);
        document.getElementById('add-service-modal').checked = false;
      } else {
        setErrorMessage("Failed to add service");
        setTimeout(() => {setErrorMessage('')}, 5000);
        document.getElementById('add-service-modal').checked = false;
      }
    })
  }

  const editService = (e, serviceId) => {
    e.preventDefault();
    const newService = {
      title: title,
      price: price,
      paymentFreq: paymentFreq,
      pros: pros,
      cons: cons,
      buttonText: buttonText,
      buttonLink: buttonLink
    }
    fetch('/api/service', {
      method: "POST",
      mode: "cors",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        serviceId: serviceId,
        newService: newService
      })
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        setServices(data.services);
        resetStates();
        setSuccessMessage(`Edited service "${title}" successfully`);
        setTimeout(() => {setSuccessMessage('')}, 5000);
        document.getElementById(`edit-service-modal-${serviceId}`).checked = false;
      } else {
        setErrorMessage(`Failed to edit service "${title}"`);
        setTimeout(() => {setErrorMessage('')}, 5000);
        document.getElementById(`edit-service-modal-${serviceId}`).checked = false;
      }
    })
  }

  const deleteService = () => {
    fetch('/api/service?' + new URLSearchParams({
      delete: true,
      serviceId: deleteId,
    }))
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        setServices(data.services);
        setSuccessMessage(`Deleted service "${deleteTitle}" successfully`);
        setTimeout(() => {setSuccessMessage('')}, 5000);
        document.getElementById(`delete-service-modal-${deleteId}`).checked = false;
      } else {
        setErrorMessage(`Failed to delete service "${deleteTitle}"`);
        setTimeout(() => {setErrorMessage('')}, 5000);
        document.getElementById(`delete-service-modal-${deleteId}`).checked = false;
      }
    })
  }

  if (services === undefined) {
    return (
      <div>Loading...</div>
    )
  } else {
    return (
      <Section>
        <h1 className="font-semibold text-4xl lg:text-6xl">Our services</h1>
        {/* <p className="text-lg lg:text-2xl font-semilight mt-4">Our company provides the following services. Feel free to email us at <a href="mailto:realfxcopier@gmail.com" className="underline text-blue-700">realfxcopier@gmail.com</a> if you have any question about any service!</p> */}
        <h1 className="text-2xl lg:text-3xl text-center font-semibold mt-16 text-violet-700">
        All these services are pre-launched and the prices can go up later. Subscribe early to get the most out of your money. Note, all subscriptions are cancellable but not refundable!
        </h1>
        {edit ?
        <div>
          <label htmlFor="add-service-modal" className="btn mt-4" onClick={resetStates}>Add service</label>
          <input type="checkbox" id="add-service-modal" className="modal-toggle" />
          <div className="modal">
            <div className="modal-box max-h-[75vh]">
              <h3 className="font-bold text-lg">Add a new service</h3>
              <form className="mt-4 text-md" onSubmit={addService}>
                <div className="mt-3">
                  <label>Title:</label>
                  <input type="text" className="form-control input input-bordered w-full max-w-xs" placeholder="Short title for your service" value={title} onChange={updateTitle}/>
                </div>
                <div className="mt-3">
                  <label>Price:</label>
                  <div className="input-group">
                    <input type="number" className="form-control input input-bordered w-32" placeholder="Price" value={price} onChange={updatePrice}/>
                    <span>CAD</span>
                  </div>
                </div>
                <div className="mt-3">
                  <label>Payment frequency:</label>
                  <select className="select select-bordered w-fit" defaultValue={paymentFreq} onChange={updatePaymentFreq}>
                    <option value="" disabled>How often clients have to pay the amount above</option>
                    <option value="per occasion">per occasion</option>
                    <option value="per day">per day</option>
                    <option value="per week">per week</option>
                    <option value="every 2 weeks">every 2 weeks</option>
                    <option value="per month">per month</option>
                    <option value="every 3 months">every 3 months</option>
                    <option value="every 6 months">every 6 months</option>
                    <option value="per year">per year</option>
                  </select>
                </div>
                <div className="mt-3">
                  <label>Pros:</label>
                  <div className="input-group">
                    <input type="text" placeholder="Add a pro" className="input input-bordered" value={newPro} onChange={updateNewPro}/>
                    <button className={`btn btn-square ${newPro === '' ? 'btn-disabled' : ''}`} onClick={addPro}>
                      <AiOutlinePlus size={20}/>
                    </button>
                  </div>
                  {pros.length > 0 ? <div className="mt-2">
                    {pros.map((pro, index) => (
                      <div key={index} className='flex flex-row mt-1 text-lg'>
                        <AiOutlineCheck className="text-green-800 font-semibold mt-1 mr-2"/>
                        {pro}
                        <div className='ml-3 text-blue-500 underline text-md cursor-default' onClick={() => {removePro(pro)}}>Remove</div>
                      </div>
                    ))}
                  </div> : null}
                </div>
                <div className="mt-3">
                  <label>Cons:</label>
                  <div className="input-group">
                    <input type="text" placeholder="Add a con" className="input input-bordered"  value={newCon} onChange={updateNewCon}/>
                    <button className={`btn btn-square ${newCon === '' ? 'btn-disabled' : ''}`} onClick={addCon}>
                      <AiOutlinePlus size={20}/>
                    </button>
                  </div>
                  {cons.length > 0 ? <div className="mt-2">
                    {cons.map((con, index) => (
                      <div key={index} className='flex flex-row mt-1 text-lg'>
                        <RxCross1 className="text-red-800 font-semibold mt-2 mr-2"/>
                        {con}
                        <div className='ml-3 text-blue-500 underline text-md cursor-default' onClick={() => {removeCon(con)}}>Remove</div>
                      </div>
                    ))}
                  </div> : null}
                </div>
                <div className="mt-3">
                  <label>Button text:</label>
                  <input type="text" className="form-control input input-bordered w-full max-w-xs" placeholder="Action button text"  value={buttonText} onChange={updateButtonText}/>
                </div>
                <div className="mt-3">
                  <label>Button link:</label>
                  <input type="url" className="form-control input input-bordered w-full max-w-xs" placeholder="Action button link" value={buttonLink} onChange={updateButtonLink}/>
                </div>
                <div className="modal-action">
                  <label htmlFor="add-service-modal" className="btn btn-error text-white hover:bg-red-600">Cancel</label>
                  <input type="submit" className={`btn ${title && paymentFreq && buttonText && buttonLink ? "": "btn-disabled"}`} value="Submit"/>
                </div>
              </form>
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
        </div>
        : null}
        <DisplayCase style="mt-4 justify-center">
          {services.map((service, index) => (
            <Card key={index} header={service.title} style="mx-auto">
              <div className="text-center">
                <span className="text-6xl font-semibold">{service.price}</span>
                <span className="text-xl font-normal ml-1">CAD</span>
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
              <div className="mt-8 mb-4 text-center">
                <OutlineButton color="violet-900" style="text-xl px-4" text={service.buttonText} link={service.buttonLink} target="_blank"/>
              </div>
              {edit ? (
                <div className='text-center'>
                  <div className="btn-group btn-group-vertical lg:btn-group-horizontal my-3 w-fit">
                    <label htmlFor={`edit-service-modal-${service._id}`} onClick={() => {
                      setTitle(service.title);
                      setPrice(service.price);
                      setPaymentFreq(service.paymentFreq);
                      setPros(service.pros);
                      setCons(service.cons);
                      setButtonText(service.buttonText);
                      setButtonLink(service.buttonLink);
                    }} className="btn">Edit</label>
                    <label htmlFor={`delete-service-modal-${service._id}`} className="btn btn-error text-white hover:bg-red-600" onClick={() => {setDeleteTitle(service.title), setDeleteId(service._id)}}>Delete</label>
                  </div>
                </div>
              ) : null}

              {/* Service edit modal */}
              <input type="checkbox" id={`edit-service-modal-${service._id}`} className="modal-toggle" />
              <div className="modal">
                <div className="modal-box max-h-[75vh]">
                  <h3 className="font-bold text-lg">Edit service</h3>
                  <form className="mt-4 text-md" onSubmit={event => {editService(event, service._id)}}>
                    <div className="mt-3">
                      <label>Title:</label>
                      <input type="text" className="form-control input input-bordered w-full max-w-xs" placeholder="Short title for your service" value={title} onChange={updateTitle}/>
                    </div>
                    <div className="mt-3">
                      <label>Price:</label>
                      <div className="input-group">
                        <input type="number" className="form-control input input-bordered w-32" placeholder="Price" value={price} onChange={updatePrice}/>
                        <span>CAD</span>
                      </div>
                    </div>
                    <div className="mt-3">
                      <label>Payment frequency:</label>
                      <select className="select select-bordered w-fit" defaultValue={paymentFreq} onChange={updatePaymentFreq}>
                        <option value="" disabled>How often clients have to pay the amount above</option>
                        <option value="per occasion">per occasion</option>
                        <option value="per day">per day</option>
                        <option value="per week">per week</option>
                        <option value="every 2 weeks">every 2 weeks</option>
                        <option value="per month">per month</option>
                        <option value="every 3 months">every 3 months</option>
                        <option value="every 6 months">every 6 months</option>
                        <option value="per year">per year</option>
                      </select>
                    </div>
                    <div className="mt-3">
                      <label>Pros:</label>
                      <div className="input-group">
                        <input type="text" placeholder="Add a pro" className="input input-bordered" value={newPro} onChange={updateNewPro}/>
                        <button className={`btn btn-square ${newPro === '' ? 'btn-disabled' : ''}`} onClick={addPro}>
                          <AiOutlinePlus size={20}/>
                        </button>
                      </div>
                      {pros.length > 0 ? <div className="mt-2">
                        {pros.map((pro, index) => (
                          <div key={index} className='flex flex-row mt-1 text-lg'>
                            <AiOutlineCheck className="text-green-800 font-semibold mt-1 mr-2"/>
                            {pro}
                            <div className='ml-3 text-blue-500 underline text-md cursor-default' onClick={() => {removePro(pro)}}>Remove</div>
                          </div>
                        ))}
                      </div> : null}
                    </div>
                    <div className="mt-3">
                      <label>Cons:</label>
                      <div className="input-group">
                        <input type="text" placeholder="Add a con" className="input input-bordered"  value={newCon} onChange={updateNewCon}/>
                        <button className={`btn btn-square ${newCon === '' ? 'btn-disabled' : ''}`} onClick={addCon}>
                          <AiOutlinePlus size={20}/>
                        </button>
                      </div>
                      {cons.length > 0 ? <div className="mt-2">
                        {cons.map((con, index) => (
                          <div key={index} className='flex flex-row mt-1 text-lg'>
                            <RxCross1 className="text-red-800 font-semibold mt-2 mr-2"/>
                            {con}
                            <div className='ml-3 text-blue-500 underline text-md cursor-default' onClick={() => {removeCon(con)}}>Remove</div>
                          </div>
                        ))}
                      </div> : null}
                    </div>
                    <div className="mt-3">
                      <label>Button text:</label>
                      <input type="text" className="form-control input input-bordered w-full max-w-xs" placeholder="Action button text"  value={buttonText} onChange={updateButtonText}/>
                    </div>
                    <div className="mt-3">
                      <label>Button link:</label>
                      <input type="url" className="form-control input input-bordered w-full max-w-xs" placeholder="Action button link" value={buttonLink} onChange={updateButtonLink}/>
                    </div>
                    <div className="modal-action">
                      <label htmlFor={`edit-service-modal-${service._id}`} className="btn btn-error text-white hover:bg-red-600">Cancel</label>
                      <input type="submit" className={`btn ${title && paymentFreq && buttonText && buttonLink ? "": "btn-disabled"}`} value="Submit"/>
                    </div>
                  </form>
                </div>
              </div>
              
              {/* Service delete modal */}
              <input type="checkbox" id={`delete-service-modal-${service._id}`} className="modal-toggle" />
              <div className="modal">
                <div className="modal-box">
                  <h3 className="font-bold text-lg">Delete service 	&ldquo;{deleteTitle}&rdquo;</h3>
                  <p className="py-4">Are you sure you want to delete service <span className="font-bold">{deleteTitle}</span>?</p>
                  <div className="modal-action">
                  <label htmlFor={`delete-service-modal-${service._id}`} className="btn btn-error text-white hover:bg-red-600">No</label>
                  <div className="btn" onClick={deleteService}>Yes</div>
                  </div>
                </div>
              </div>
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
    )
  }
}

export function Service() {
  const services = [
    {
      'title': '1 session everyday',
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
      "title": "Sneaky Pete indicator",
      "price": "200",
      "paymentFreq": "per occasion",
      "pros": [
        "Here's one indicator we use primarily in our trading. It identifies short and long term trades. We like to use it for quick scalps. Buy yours today before the price goes up. Trade like we do."
      ],
      "cons": [],
      "buttonText": "Buy now",
      "buttonLink": "https://buy.stripe.com/14kcPDgQw3BygX6eV2"
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
          <Card key={index} header={service.title} style="mx-auto">
            <div className="text-center">
              <span className="text-6xl font-semibold">{service.price}</span>
              <span className="text-xl font-normal ml-1">CAD</span>
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
            <div className="mt-8 mb-4 text-center">
              <OutlineButton color="violet-900" style="text-xl px-4" text={service.buttonText} link={service.buttonLink} target="_blank"/>
            </div>
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
          <OutlineButton color="white" style="mx-2 text-2xl border-2 hover:border-3 px-4" text="Join Eightcap now!" link="https://join.eightcap.com/visit/?bta=38222&brand=eightcap" target='_blank'/>
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
                <GalleryImage src={imageURL} style={`mt-8 w-72 h-128 mx-auto md:mx-3 ${!imageSelectMode ? "" : "hidden"}`} onClick={() => {setLightBoxSrc(imageURL); setLighBoxOpened(true);}}/>
                <GalleryImage src={imageURL} selectedMode style={`mt-8 w-72 h-128 mx-auto md:mx-3 ${imageSelectMode ? "" : "hidden"}`} onClick={() => {toggleImageSelectionForDeletion(monthName, imageURL)}}/>
              </div>
            ))}
            {historyImages.filter(rec => rec.month === monthName)[0].images.length > 4 ? (<div className="relative bg-slate-200 hover:bg-slate-300 mt-8 w-72 h-128 mx-auto md:mx-3" onClick={() => {setShowAll(!showAll);}}>
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