// app.jsx
import { useState, useEffect, useRef, useCallback } from "react";
import "./app.css";

const App = () => {
  // ---------- Menu toggle ----------
  const [menuOpen, setMenuOpen] = useState(false);

  // ---------- Accordion (active item index) ----------
  const [activeAcc, setActiveAcc] = useState(1); // second item active by default

  // ---------- Slider ----------
  const sliderRef = useRef(null);
  const sliderWrapperRef = useRef(null);
  const [scrollAmount, setScrollAmount] = useState(0);
  const cardWidth = 350;

  const getMaxScroll = useCallback(() => {
    const wrapper = sliderWrapperRef.current;
    const slider = sliderRef.current;
    if (!wrapper || !slider) return 0;
    return slider.scrollWidth - wrapper.clientWidth;
  }, []);

  const handleNext = () => {
    const maxScroll = getMaxScroll();
    setScrollAmount((prev) => {
      const next = prev + cardWidth;
      return next > maxScroll ? maxScroll : next;
    });
  };

  const handlePrev = () => {
    setScrollAmount((prev) => {
      const next = prev - cardWidth;
      return next < 0 ? 0 : next;
    });
  };

  useEffect(() => {
    const handleResize = () => {
      const maxScroll = getMaxScroll();
      setScrollAmount((prev) => (prev > maxScroll ? maxScroll : prev));
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [getMaxScroll]);

  // Update slider transform directly via ref to avoid constant re-renders
  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.style.transform = `translateX(-${scrollAmount}px)`;
    }
  }, [scrollAmount]);

  // ---------- Tags animation ----------
  const topRowRef = useRef(null);
  const bottomRowRef = useRef(null);
  const animationRef = useRef(null);
  const topPos = useRef(0);
  const bottomPos = useRef(0);

  useEffect(() => {
    const animate = () => {
      if (topRowRef.current) {
        topPos.current -= 0.5;
        if (topPos.current <= -300) topPos.current = 0;
        topRowRef.current.style.transform = `translateX(${topPos.current}px)`;
      }
      if (bottomRowRef.current) {
        bottomPos.current += 0.5;
        if (bottomPos.current >= 300) bottomPos.current = 0;
        bottomRowRef.current.style.transform = `translateX(${bottomPos.current}px)`;
      }
      animationRef.current = requestAnimationFrame(animate);
    };
    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
  }, []);

  // ---------- Accordion toggle ----------
  const toggleAccordion = (index) => {
    setActiveAcc((prev) => (prev === index ? null : index));
  };

  return (
    <>
      {/* NAVBAR */}
      <div className="navbar">
        <div
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className={`nav ${menuOpen ? "active" : ""}`}>
          <li className="li1">Home</li>
          <li><a href="">About</a></li>
          <li><a href="">Services</a></li>
          <li><a href="">Blog</a></li>
        </div>
      </div>

      {/* HERO */}
      <div className="hero-wrapper">
        <img src="img/1.png" className="hero-img" alt="Hot Air Balloon" />
        <li className="li2">Book Now</li>

        <div className="overlay">
          <div className="text">
            <h1>Float Above The Clouds</h1>
            <p className="subtitle">
              Experience breathtaking views from a luxury hot air balloon.
              Soar high above the landscape and create memories that will
              last a lifetime with Sky Balloon Adventures.
            </p>
          </div>

          <div className="scroll-btn">
            <span>Scroll down</span>
            <svg
              className="scroll-arrow"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>

          <div className="shapes">
            <div className="shape1"></div>
            <div className="shape2"></div>
            <div className="icon-row">
              <div className="icon-circle">
                <svg viewBox="0 0 24 24">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </div>
              <div className="icon-circle">
                <svg viewBox="0 0 24 24">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
                </svg>
              </div>
              <div className="icon-circle">
                <svg viewBox="0 0 24 24">
                  <circle cx="18" cy="5" r="3" />
                  <circle cx="6" cy="12" r="3" />
                  <circle cx="18" cy="19" r="3" />
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                  <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                </svg>
              </div>
              <div className="icon-circle">
                <svg viewBox="0 0 24 24">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BALLOON SERVICES SECTION */}
      <section className="collections-section">
        <h2 className="collections-title">Sky Balloon Services</h2>
        <div className="tags-wrapper">
          <div className="tags-row row-top" ref={topRowRef}>
            <div className="tag"><div className="tag-circle purple"></div><span>Sunrise Balloon Rides</span></div>
            <div className="tag"><div className="tag-circle blue"></div><span>Private Couple Flights</span></div>
            <div className="tag"><div className="tag-circle pink"></div><span>Photography Tours</span></div>
            <div className="tag"><div className="tag-circle orange"></div><span>VIP Sky Experience</span></div>
            <div className="tag"><div className="tag-circle green"></div><span>Group Packages</span></div>
            <div className="tag"><div className="tag-circle purple"></div><span>Sunrise Balloon Rides</span></div>
            <div className="tag"><div className="tag-circle blue"></div><span>Private Couple Flights</span></div>
            <div className="tag"><div className="tag-circle purple"></div><span>Sunrise Balloon Rides</span></div>
            <div className="tag"><div className="tag-circle blue"></div><span>Private Couple Flights</span></div>
            <div className="tag"><div className="tag-circle pink"></div><span>Photography Tours</span></div>
            <div className="tag"><div className="tag-circle orange"></div><span>VIP Sky Experience</span></div>
            <div className="tag"><div className="tag-circle green"></div><span>Group Packages</span></div>
            <div className="tag"><div className="tag-circle purple"></div><span>Sunrise Balloon Rides</span></div>
            <div className="tag"><div className="tag-circle blue"></div><span>Private Couple Flights</span></div>
          </div>
          <div className="tags-row row-bottom" ref={bottomRowRef}>
            <div className="tag"><div className="tag-circle red"></div><span>Event Bookings</span></div>
            <div className="tag"><div className="tag-circle black"></div><span>Sunset Flights</span></div>
            <div className="tag"><div className="tag-circle yellow"></div><span>Champagne Tours</span></div>
            <div className="tag"><div className="tag-circle blue"></div><span>Family Adventures</span></div>
            <div className="tag"><div className="tag-circle purple"></div><span>Proposal Packages</span></div>
            <div className="tag"><div className="tag-circle red"></div><span>Event Bookings</span></div>
            <div className="tag"><div className="tag-circle black"></div><span>Sunset Flights</span></div>
            <div className="tag"><div className="tag-circle purple"></div><span>Sunrise Balloon Rides</span></div>
            <div className="tag"><div className="tag-circle blue"></div><span>Private Couple Flights</span></div>
            <div className="tag"><div className="tag-circle pink"></div><span>Photography Tours</span></div>
            <div className="tag"><div className="tag-circle orange"></div><span>VIP Sky Experience</span></div>
            <div className="tag"><div className="tag-circle green"></div><span>Group Packages</span></div>
            <div className="tag"><div className="tag-circle purple"></div><span>Sunrise Balloon Rides</span></div>
            <div className="tag"><div className="tag-circle blue"></div><span>Private Couple Flights</span></div>
          </div>
          <button className="explore-btn">Explore All Services</button>
        </div>
      </section>

      {/* ABOUT & EXPERIENCES */}
      <section className="abo">
        <div className="container">
          <div className="top-section">
            <div className="left-text">
              <p>
                Sky Balloon Adventures has been creating unforgettable
                aerial experiences for over a decade. From romantic couple
                flights to thrilling group excursions, we bring the magic
                of hot air ballooning to adventurers of all ages.
              </p>
            </div>
            <div className="right-content">
              <h1>
                Soar high above the world <br />
                and embrace the open sky.
              </h1>
              <div className="btn-group">
                <button className="btn btn-fill">About Us</button>
                <button className="btn btn-outline">View Packages →</button>
              </div>
            </div>
          </div>

          <section className="x9p-green-wrap">
            <div className="k7v-green-box">
              <div className="b2r-left-side">
                <div className="m8q-green-icon">
                  <span></span><span></span><span></span><span></span>
                </div>
                <h1 className="h4x-outline-text">SKY</h1>
              </div>
              <div className="p6d-circle-main">
                <img src="img/11.jpg" alt="Balloon Adventure" />
              </div>
              <div className="f3w-right-text">
                <h1>ADVENTURE</h1>
              </div>
            </div>
          </section>

          <div className="pro">
            <div className="project-btn">Our Experiences</div>
            <h2 className="section-heading">
              We offer a variety of balloon adventures, from sunrise
              flights to exclusive VIP sky tours, all designed to give
              you <span className="highlight">the best views</span>
            </h2>
          </div>

          <div className="slider-wrapper" ref={sliderWrapperRef}>
            <div className="cards-slider" ref={sliderRef}>
              <div className="big-card">
                <div>
                  <h3>Sunrise Balloon Ride</h3>
                  <p>
                    Watch the sunrise from above the clouds on our
                    most popular flight. Includes champagne breakfast
                    and a personalized flight certificate.
                  </p>
                  <a href="#" className="card-btn">Read More<span className="arrow">↗</span></a>
                </div>
                <img src="img/11.png" alt="Sunrise Balloon" />
              </div>
              <div className="card card-2">
                <div>
                  <h3>Private Couple Flight</h3>
                  <p>An intimate balloon ride for two with panoramic views.</p>
                </div>
                <a href="#" className="card-btn">Read More<span className="arrow">↗</span></a>
              </div>
              <div className="card card-3">
                <div>
                  <h3>Photography Tour</h3>
                  <p>Capture stunning aerial shots with expert guidance.</p>
                </div>
                <a href="#" className="card-btn">Read More<span className="arrow">↗</span></a>
              </div>
              <div className="card card-4">
                <div>
                  <h3>VIP Sky Experience</h3>
                  <p>Premium balloon journey with luxury amenities.</p>
                </div>
                <a href="#" className="card-btn">Read More<span className="arrow">↗</span></a>
              </div>
              <div className="card card-5">
                <div>
                  <h3>Group Package</h3>
                  <p>Fun group flights for friends, families, and teams.</p>
                </div>
                <a href="#" className="card-btn">Read More<span className="arrow">↗</span></a>
              </div>
              <div className="card card-6">
                <div>
                  <h3>Event Bookings</h3>
                  <p>Make your special event unforgettable in the sky.</p>
                </div>
                <a href="#" className="card-btn">Read More<span className="arrow">↗</span></a>
              </div>
            </div>
          </div>

          <div className="controls">
            <button className="control-btn" onClick={handlePrev}>←</button>
            <button className="control-btn" onClick={handleNext}>→</button>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="gallery-section">
        <h1>Sky Gallery</h1>
        <p className="gallery-intro">
          Explore breathtaking aerial views, colorful balloon festivals,
          peaceful sunrise flights, romantic couple journeys, and unforgettable
          sky adventures through our gallery.
        </p>
        <div className="gallery-grid">
          <div className="img-box big">
            <img src="img/3.png" alt="Balloon" />
            <div className="img-overlay">
              <span>Sunrise Magic</span>
              <div className="zoom-icon">🔍</div>
            </div>
          </div>
          <div className="img-box small">
            <img src="img/4.png" alt="Balloon" />
            <div className="img-overlay">
              <span>Valley Views</span>
              <div className="zoom-icon">🔍</div>
            </div>
          </div>
          <div className="img-box small">
            <img src="img/5.png" alt="Balloon" />
            <div className="img-overlay">
              <span>Colorful Skies</span>
              <div className="zoom-icon">🔍</div>
            </div>
          </div>
          <div className="img-box big">
            <img src="img/2.png" alt="Balloon" />
            <div className="img-overlay">
              <span>Festival Fun</span>
              <div className="zoom-icon">🔍</div>
            </div>
          </div>
          <div className="img-box small">
            <img src="img/11.png" alt="Balloon" />
            <div className="img-overlay">
              <span>Cloud Surfing</span>
              <div className="zoom-icon">🔍</div>
            </div>
          </div>
          <div className="img-box small">
            <img src="img/6.png" alt="Balloon" />
            <div className="img-overlay">
              <span>Romantic Flight</span>
              <div className="zoom-icon">🔍</div>
            </div>
          </div>
        </div>
        <button className="gallery-btn">View Full Gallery</button>
      </section>

      {/* OUR STORY */}
     

      {/* PLAN YOUR FLIGHT (FAQ) */}
      <div className="container1">
        <div className="top1">
          <div className="heading">
            <h1>Plan Your Flight</h1>
            <span>↗</span>
          </div>
          <p>
            Everything you need to know about booking your
            unforgettable balloon adventure with us
          </p>
        </div>
        <div className="accordion">
          {[
            {
              question: "How do I book a balloon ride?",
              answer:
                "Simply choose your preferred package from our services page, select a date, and complete the online booking. You'll receive a confirmation within 24 hours.",
            },
            {
              question: "What should I wear for the flight?",
              answer:
                "We recommend comfortable, layered clothing and flat shoes. The temperature in the balloon is similar to ground level, but mornings can be cool. Avoid loose accessories that could get caught.",
            },
            {
              question: "How long does a flight last?",
              answer:
                "Most flights last between 45 minutes to 1.5 hours, depending on wind conditions and the chosen package. The total experience including preparation and celebration is approximately 3-4 hours.",
            },
            {
              question: "Is ballooning safe for everyone?",
              answer:
                "Safety is our top priority. All our pilots are fully certified and balloons undergo regular inspections. Flights are suitable for ages 6 and above. Pregnant individuals should consult their doctor before booking.",
            },
          ].map((item, index) => (
            <div
              className={`item ${activeAcc === index ? "active" : ""}`}
              key={index}
            >
              <button className="question" onClick={() => toggleAccordion(index)}>
                <h2>{item.question}</h2>
                <div className="icon">↗</div>
              </button>
              <div className="answer">
                <p>{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* WHY FLY WITH US */}
      <section className="why-us">
        <h2>Why Fly With Us?</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </div>
            <h3>Safety First</h3>
            <p>All our balloons and equipment are FAA-certified. Our pilots have over 10 years of experience and impeccable safety records.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 10l-5 5-5-5"/>
                <path d="M3 18h18"/>
                <path d="M6 14l3-3 3 3 4-4 3 3"/>
              </svg>
            </div>
            <h3>Breathtaking Views</h3>
            <p>We fly over the most scenic valleys and vineyards, offering unparalleled panoramic views that you'll cherish forever.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 21h8"/>
                <path d="M12 15v6"/>
                <path d="M17 8c0-3-2-5-5-5S7 5 7 8"/>
                <path d="M7 8h10"/>
                <circle cx="9" cy="6" r="1" fill="white"/>
                <circle cx="12" cy="4" r="1" fill="white"/>
                <circle cx="15" cy="6" r="1" fill="white"/>
              </svg>
            </div>
            <h3>Luxury Experience</h3>
            <p>From champagne toasts to gourmet picnic baskets, every flight is a celebration of the senses.</p>
          </div>
        </div>
      </section>

      {/* PRICING PLANS */}
      <section className="pricing-section">
        <h2>Pricing Plans</h2>
        <div className="pricing-grid">
          <div className="pricing-card">
            <h3>Sunrise Serenity</h3>
            <div className="price">$249<span>/person</span></div>
            <ul>
              <li>45-minute sunrise flight</li>
              <li>Continental breakfast</li>
              <li>Flight certificate</li>
              <li>Group up to 8 people</li>
            </ul>
            <button className="btn-book">Book Now</button>
          </div>
          <div className="pricing-card featured">
            <h3>Couple's Escape</h3>
            <div className="price">$599<span>/couple</span></div>
            <ul>
              <li>Private 1-hour flight</li>
              <li>Champagne & chocolates</li>
              <li>Professional photos</li>
              <li>Luxury picnic setup</li>
            </ul>
            <button className="btn-book">Book Now</button>
          </div>
          <div className="pricing-card">
            <h3>VIP Grand Voyage</h3>
            <div className="price">$899<span>/person</span></div>
            <ul>
              <li>2-hour exclusive flight</li>
              <li>Gourmet five-course meal</li>
              <li>Personal pilot & guide</li>
              <li>Video highlights reel</li>
            </ul>
            <button className="btn-book">Book Now</button>
          </div>
        </div>
      </section>

      {/* MEET OUR PILOTS */}
      <section className="team-section">
        <h2>Meet Our Pilots</h2>
        <div className="team-grid">
          <div className="team-member">
            <img src="img/11.jpg" alt="Captain Amelia" />
            <h3>Captain Amelia</h3>
            <p>Chief Pilot & Founder</p>
            <div className="social-links">
              <a href="#">in</a>
              <a href="#">✉</a>
            </div>
          </div>
          <div className="team-member">
            <img src="img/11.jpg" alt="Jack Wilder" />
            <h3>Jack Wilder</h3>
            <p>Senior Balloon Pilot</p>
            <div className="social-links">
              <a href="#">in</a>
              <a href="#">✉</a>
            </div>
          </div>
          <div className="team-member">
            <img src="img/11.jpg" alt="Sofia Laurent" />
            <h3>Sofia Laurent</h3>
            <p>Flight Experience Director</p>
            <div className="social-links">
              <a href="#">in</a>
              <a href="#">✉</a>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonials-section">
        <h2>What Our Guests Say</h2>
        <div className="testimonial-cards">
          <div className="testimonial-card">
            <div className="quote-icon">❝</div>
            <p className="testimonial-text">"An absolutely magical experience! The sunrise flight was breathtaking and the crew made us feel like royalty. Highly recommend the couple's escape."</p>
            <p className="testimonial-author">— Emily & James R.</p>
          </div>
          <div className="testimonial-card">
            <div className="quote-icon">❝</div>
            <p className="testimonial-text">"I booked the VIP package for my proposal and it was perfect. They helped me plan every detail and she said yes! Thank you Sky Balloon!"</p>
            <p className="testimonial-author">— David K.</p>
          </div>
          <div className="testimonial-card">
            <div className="quote-icon">❝</div>
            <p className="testimonial-text">"Our group of friends had the best time. The views were stunning and the pilot was so knowledgeable. We'll be back for the sunset flight."</p>
            <p className="testimonial-author">— The Garcia Family</p>
          </div>
        </div>
      </section>

      {/* SUBSCRIBE */}
      <section className="xv-main-wrapper">
        <h1 className="zx-ultra-heading">
          Know
          <img src="img/1.png" alt="Sky" className="pq-inline-photo" />
          more <br />
          about Sky Balloon.
        </h1>
        <div className="kl-subscribe-holder">
          <span className="nm-subscribe-label">Subscribe</span>
          <button className="rt-arrow-circle-btn">→</button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <span className="bubble b1"></span>
        <span className="bubble b2"></span>
        <span className="bubble b3"></span>
        <span className="bubble b4"></span>
        <span className="bubble b5"></span>
        <span className="bubble b6"></span>
        <span className="bubble b7"></span>
        <span className="bubble b8"></span>
        <span className="bubble b9"></span>

        <div className="footer-container">
          <div className="footer-info">
            <h2>Come Fly With Us!</h2>
            <div className="footer-details">
              <div className="detail-item">
                <i>📍</i>
                <p>25 Skyview Lane,<br />Napa Valley, CA</p>
              </div>
              <div className="detail-item">
                <i>🕒</i>
                <p>Daily flights: 5:30 AM & 4:00 PM</p>
              </div>
              <div className="detail-item">
                <i>📞</i>
                <p>+1 (707) 555-BALLOON</p>
              </div>
              <div className="detail-item">
                <i>✉️</i>
                <p>fly@skyballoonadventures.com</p>
              </div>
            </div>
            <div className="newsletter">
              <h4>Join our newsletter</h4>
              <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
                <input type="email" placeholder="Your email address" />
                <button type="submit">Subscribe</button>
              </form>
            </div>
          </div>
          <div className="footer-map">
            <iframe src="https://www.google.com/maps?q=Napa+Valley+California&output=embed" loading="lazy"></iframe>
          </div>
        </div>
        <div className="footer-bottom">
          © 2026 Sky Balloon Adventures. All rights reserved. | Privacy Policy | Terms of Service
        </div>
      </footer>
    </>
  );
};

export default App;