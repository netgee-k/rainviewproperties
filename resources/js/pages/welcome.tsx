import { Head, Link, usePage } from '@inertiajs/react';
import { dashboard, login, register } from '@/routes';

export default function Welcome({ canRegister = true }: { canRegister?: boolean }) {
    const { auth } = usePage<{ auth: { user?: { name: string } } }>().props;

    return (
        <>
            <Head title="RainView Properties — Find Your Place">
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&family=Material+Icons+Round&display=swap" rel="stylesheet" />
                <style>{`
                    * { margin: 0; padding: 0; box-sizing: border-box; }
                    :root {
                        --cream: #F7F4EF;
                        --charcoal: #1C1C1A;
                        --bronze: #B87333;
                        --bronze-light: #D4956A;
                        --sage: #7A8C75;
                        --warm-grey: #8C8880;
                        --card-bg: #FDFCFA;
                    }
                    body { background: var(--cream); color: var(--charcoal); }

                    @keyframes fadeUp {
                        from { opacity: 0; transform: translateY(32px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                    @keyframes fadeIn {
                        from { opacity: 0; }
                        to { opacity: 1; }
                    }
                    @keyframes slideRight {
                        from { transform: scaleX(0); }
                        to { transform: scaleX(1); }
                    }
                    .anim-1 { animation: fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s both; }
                    .anim-2 { animation: fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.25s both; }
                    .anim-3 { animation: fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.4s both; }
                    .anim-4 { animation: fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.55s both; }
                    .anim-5 { animation: fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.7s both; }
                    .line-anim { animation: slideRight 1s cubic-bezier(0.16,1,0.3,1) 0.2s both; transform-origin: left; }

                    .cat-card:hover { transform: translateY(-4px); box-shadow: 0 20px 40px rgba(0,0,0,0.08); }
                    .cat-card { transition: transform 0.3s ease, box-shadow 0.3s ease; }
                    .listing-card:hover { transform: translateY(-4px); }
                    .listing-card { transition: transform 0.3s ease; }
                    .btn-primary:hover { background: #9A6128; }
                    .btn-primary { transition: background 0.2s ease; }
                    .btn-outline:hover { background: var(--charcoal); color: var(--cream); }
                    .btn-outline { transition: all 0.2s ease; }
                    .nav-link:hover { color: var(--bronze); }
                    .nav-link { transition: color 0.2s ease; }
                `}</style>
            </Head>

            <div style={{ fontFamily: "'DM Sans', sans-serif", minHeight: '100vh', background: 'var(--cream)' }}>

                {/* ── NAV ── */}
                <nav style={{
                    position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
                    background: 'rgba(247,244,239,0.92)', backdropFilter: 'blur(12px)',
                    borderBottom: '1px solid rgba(28,28,26,0.08)',
                    padding: '0 2rem', height: '64px',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{
                            width: '32px', height: '32px', background: 'var(--bronze)',
                            borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                            <span style={{ color: 'white', fontSize: '14px' }} className="material-icons-round">home_work</span>
                        </div>
                        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '20px', fontWeight: 600, letterSpacing: '-0.02em' }}>
                            RainView
                        </span>
                    </div>

                    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                        <a href="#categories" className="nav-link" style={{ fontSize: '14px', color: 'var(--warm-grey)', textDecoration: 'none', fontWeight: 500 }}>Browse</a>
                        <a href="#listings" className="nav-link" style={{ fontSize: '14px', color: 'var(--warm-grey)', textDecoration: 'none', fontWeight: 500 }}>Listings</a>
                        <a href="#about" className="nav-link" style={{ fontSize: '14px', color: 'var(--warm-grey)', textDecoration: 'none', fontWeight: 500 }}>About</a>
                    </div>

                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                        {auth.user ? (
                            <Link href={dashboard()} style={{
                                background: 'var(--bronze)', color: 'white',
                                padding: '8px 20px', borderRadius: '8px',
                                textDecoration: 'none', fontSize: '14px', fontWeight: 500,
                            }} className="btn-primary">
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link href={login()} className="nav-link" style={{ fontSize: '14px', color: 'var(--charcoal)', textDecoration: 'none', fontWeight: 500 }}>
                                    Sign in
                                </Link>
                                {canRegister && (
                                    <Link href={register()} style={{
                                        background: 'var(--charcoal)', color: 'var(--cream)',
                                        padding: '8px 20px', borderRadius: '8px',
                                        textDecoration: 'none', fontSize: '14px', fontWeight: 500,
                                    }} className="btn-outline">
                                        Get Started
                                    </Link>
                                )}
                            </>
                        )}
                    </div>
                </nav>

                {/* ── HERO ── */}
                <section style={{
                    paddingTop: '120px', paddingBottom: '80px',
                    paddingLeft: '2rem', paddingRight: '2rem',
                    maxWidth: '1200px', margin: '0 auto',
                    display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center',
                }}>
                    {/* Left */}
                    <div>
                        <div className="anim-1" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
                            <div style={{ height: '1px', width: '40px', background: 'var(--bronze)' }} className="line-anim" />
                            <span style={{ fontSize: '12px', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--bronze)' }}>
                                Kenya's Premier Marketplace
                            </span>
                        </div>

                        <h1 className="anim-2" style={{
                            fontFamily: "'Cormorant Garamond', serif",
                            fontSize: 'clamp(48px, 6vw, 80px)',
                            fontWeight: 300, lineHeight: 1.05,
                            letterSpacing: '-0.02em', color: 'var(--charcoal)',
                            marginBottom: '24px',
                        }}>
                            Find Your<br />
                            <em style={{ fontStyle: 'italic', color: 'var(--bronze)' }}>Perfect</em><br />
                            Property
                        </h1>

                        <p className="anim-3" style={{
                            fontSize: '16px', lineHeight: 1.7, color: 'var(--warm-grey)',
                            maxWidth: '420px', marginBottom: '40px', fontWeight: 300,
                        }}>
                            Houses, plots, cars, BnBs and car hire — all in one place. Browse thousands of verified listings across Kenya.
                        </p>

                        <div className="anim-4" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                            <a href="#categories" style={{
                                background: 'var(--bronze)', color: 'white',
                                padding: '14px 32px', borderRadius: '10px',
                                textDecoration: 'none', fontSize: '15px', fontWeight: 500,
                                display: 'flex', alignItems: 'center', gap: '8px',
                            }} className="btn-primary">
                                <span className="material-icons-round" style={{ fontSize: '18px' }}>search</span>
                                Browse Listings
                            </a>
                            {!auth.user && canRegister && (
                                <Link href={register()} style={{
                                    background: 'transparent', color: 'var(--charcoal)',
                                    padding: '14px 32px', borderRadius: '10px',
                                    textDecoration: 'none', fontSize: '15px', fontWeight: 500,
                                    border: '1.5px solid rgba(28,28,26,0.2)',
                                    display: 'flex', alignItems: 'center', gap: '8px',
                                }} className="btn-outline">
                                    List Your Property
                                    <span className="material-icons-round" style={{ fontSize: '18px' }}>arrow_forward</span>
                                </Link>
                            )}
                        </div>

                        {/* Stats */}
                        <div className="anim-5" style={{ display: 'flex', gap: '40px', marginTop: '56px', paddingTop: '32px', borderTop: '1px solid rgba(28,28,26,0.08)' }}>
                            {[
                                { num: '2,400+', label: 'Active Listings' },
                                { num: '500+', label: 'Verified Sellers' },
                                { num: '47', label: 'Counties Covered' },
                            ].map(s => (
                                <div key={s.label}>
                                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '32px', fontWeight: 600, color: 'var(--charcoal)' }}>{s.num}</div>
                                    <div style={{ fontSize: '12px', color: 'var(--warm-grey)', fontWeight: 400, marginTop: '2px' }}>{s.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right — visual grid */}
                    <div className="anim-2" style={{ position: 'relative' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                            {/* Big card */}
                            <div style={{
                                gridRow: '1 / 3', background: 'linear-gradient(135deg, #2C3E2D 0%, #4A5E3A 100%)',
                                borderRadius: '16px', padding: '32px 24px',
                                display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', minHeight: '280px',
                                position: 'relative', overflow: 'hidden',
                            }}>
                                <div style={{ position: 'absolute', top: '24px', right: '24px', background: 'rgba(255,255,255,0.15)', borderRadius: '50%', width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <span className="material-icons-round" style={{ color: 'white', fontSize: '24px' }}>home</span>
                                </div>
                                <div style={{ position: 'absolute', top: '-40px', left: '-40px', width: '160px', height: '160px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
                                <span style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', marginBottom: '8px' }}>Featured</span>
                                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '22px', color: 'white', fontWeight: 400, lineHeight: 1.2 }}>3-Bed House<br />Kilimani</div>
                                <div style={{ marginTop: '12px', fontSize: '18px', fontWeight: 600, color: '#D4956A' }}>KES 12.5M</div>
                            </div>

                            {/* Car card */}
                            <div style={{
                                background: 'linear-gradient(135deg, #1C2B3A 0%, #2D4460 100%)',
                                borderRadius: '16px', padding: '24px',
                                display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '130px',
                            }}>
                                <span className="material-icons-round" style={{ color: '#6BA3D6', fontSize: '28px' }}>directions_car</span>
                                <div>
                                    <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', marginBottom: '2px' }}>Toyota Prado</div>
                                    <div style={{ fontSize: '16px', fontWeight: 600, color: 'white' }}>KES 4.2M</div>
                                </div>
                            </div>

                            {/* Plot card */}
                            <div style={{
                                background: 'linear-gradient(135deg, #3D2C1E 0%, #6B4C32 100%)',
                                borderRadius: '16px', padding: '24px',
                                display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '130px',
                            }}>
                                <span className="material-icons-round" style={{ color: '#D4956A', fontSize: '28px' }}>landscape</span>
                                <div>
                                    <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', marginBottom: '2px' }}>½ Acre Plot, Ruiru</div>
                                    <div style={{ fontSize: '16px', fontWeight: 600, color: 'white' }}>KES 2.8M</div>
                                </div>
                            </div>
                        </div>

                        {/* Floating badge */}
                        <div style={{
                            position: 'absolute', bottom: '-16px', left: '50%', transform: 'translateX(-50%)',
                            background: 'white', borderRadius: '12px', padding: '12px 20px',
                            boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                            display: 'flex', alignItems: 'center', gap: '10px', whiteSpace: 'nowrap',
                        }}>
                            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4CAF50', flexShrink: 0 }} />
                            <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--charcoal)' }}>24 new listings today</span>
                        </div>
                    </div>
                </section>

                {/* ── SEARCH BAR ── */}
                <section style={{ padding: '60px 2rem 40px', maxWidth: '900px', margin: '0 auto' }}>
                    <div style={{
                        background: 'white', borderRadius: '16px',
                        padding: '8px', display: 'flex', gap: '8px', alignItems: 'center',
                        boxShadow: '0 4px 24px rgba(0,0,0,0.08)', border: '1px solid rgba(28,28,26,0.06)',
                    }}>
                        <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 16px' }}>
                            <span className="material-icons-round" style={{ color: 'var(--warm-grey)', fontSize: '20px' }}>search</span>
                            <input placeholder="Search properties, cars, plots..." style={{
                                border: 'none', outline: 'none', fontSize: '15px', width: '100%',
                                color: 'var(--charcoal)', background: 'transparent',
                                fontFamily: "'DM Sans', sans-serif",
                            }} />
                        </div>
                        <div style={{ width: '1px', height: '32px', background: 'rgba(28,28,26,0.1)' }} />
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 16px' }}>
                            <span className="material-icons-round" style={{ color: 'var(--warm-grey)', fontSize: '20px' }}>location_on</span>
                            <input placeholder="Location" style={{
                                border: 'none', outline: 'none', fontSize: '15px', width: '120px',
                                color: 'var(--charcoal)', background: 'transparent',
                                fontFamily: "'DM Sans', sans-serif",
                            }} />
                        </div>
                        <button style={{
                            background: 'var(--bronze)', color: 'white', border: 'none',
                            borderRadius: '10px', padding: '12px 24px', fontSize: '14px',
                            fontWeight: 500, cursor: 'pointer', whiteSpace: 'nowrap',
                            fontFamily: "'DM Sans', sans-serif",
                        }} className="btn-primary">
                            Search
                        </button>
                    </div>
                </section>

                {/* ── CATEGORIES ── */}
                <section id="categories" style={{ padding: '40px 2rem 80px', maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{ marginBottom: '40px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                            <div style={{ height: '1px', width: '32px', background: 'var(--bronze)' }} />
                            <span style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--bronze)' }}>Categories</span>
                        </div>
                        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '40px', fontWeight: 300, color: 'var(--charcoal)' }}>
                            What are you looking for?
                        </h2>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px' }}>
                        {[
                            { icon: 'home', label: 'Houses', count: '248', color: '#2C3E2D', accent: '#7A9E7E', href: '/listings?category=houses' },
                            { icon: 'directions_car', label: 'Cars', count: '192', color: '#1C2B3A', accent: '#6BA3D6', href: '/listings?category=cars' },
                            { icon: 'landscape', label: 'Plots', count: '87', color: '#3D2C1E', accent: '#D4956A', href: '/listings?category=plots' },
                            { icon: 'hotel', label: 'BnB', count: '54', color: '#2C1E3D', accent: '#B39DDB', href: '/listings?category=bnb' },
                            { icon: 'car_rental', label: 'Car Hire', count: '31', color: '#1E2D2C', accent: '#80CBC4', href: '/listings?category=car-hire' },
                        ].map(cat => (
                            <a key={cat.label} href={cat.href} className="cat-card" style={{
                                background: cat.color, borderRadius: '16px', padding: '28px 20px',
                                textDecoration: 'none', display: 'flex', flexDirection: 'column', gap: '16px',
                                position: 'relative', overflow: 'hidden',
                            }}>
                                <div style={{ position: 'absolute', bottom: '-20px', right: '-20px', width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />
                                <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: `${cat.accent}22`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <span className="material-icons-round" style={{ color: cat.accent, fontSize: '22px' }}>{cat.icon}</span>
                                </div>
                                <div>
                                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '20px', color: 'white', fontWeight: 400 }}>{cat.label}</div>
                                    <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginTop: '2px' }}>{cat.count} listings</div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    <span style={{ fontSize: '12px', color: cat.accent, fontWeight: 500 }}>Browse</span>
                                    <span className="material-icons-round" style={{ color: cat.accent, fontSize: '14px' }}>arrow_forward</span>
                                </div>
                            </a>
                        ))}
                    </div>
                </section>

                {/* ── FEATURED LISTINGS ── */}
                <section id="listings" style={{ padding: '0 2rem 80px', maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '40px' }}>
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                                <div style={{ height: '1px', width: '32px', background: 'var(--bronze)' }} />
                                <span style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--bronze)' }}>Featured</span>
                            </div>
                            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '40px', fontWeight: 300, color: 'var(--charcoal)' }}>
                                Latest Listings
                            </h2>
                        </div>
                        <Link href="/listings" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--bronze)', textDecoration: 'none', fontSize: '14px', fontWeight: 500 }}>
                            View all <span className="material-icons-round" style={{ fontSize: '18px' }}>arrow_forward</span>
                        </Link>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
                        {[
                            { title: '4-Bed Maisonette', location: 'Runda, Nairobi', price: 'KES 25M', type: 'For Sale', category: 'House', icon: 'home', bg: '#E8F0E9' },
                            { title: 'Land Rover Defender', location: 'Westlands, Nairobi', price: 'KES 8.5M', type: 'For Sale', category: 'Car', icon: 'directions_car', bg: '#E8EDF0' },
                            { title: 'Luxury BnB Suite', location: 'Karen, Nairobi', price: 'KES 8,500/night', type: 'For Rent', category: 'BnB', icon: 'hotel', bg: '#EEE8F0' },
                        ].map(item => (
                            <div key={item.title} className="listing-card" style={{
                                background: 'white', borderRadius: '16px', overflow: 'hidden',
                                border: '1px solid rgba(28,28,26,0.06)',
                            }}>
                                {/* Image placeholder */}
                                <div style={{
                                    height: '200px', background: item.bg,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    position: 'relative',
                                }}>
                                    <span className="material-icons-round" style={{ fontSize: '64px', color: 'rgba(28,28,26,0.1)' }}>{item.icon}</span>
                                    <div style={{
                                        position: 'absolute', top: '12px', left: '12px',
                                        background: 'white', borderRadius: '6px', padding: '4px 10px',
                                        fontSize: '11px', fontWeight: 500, color: 'var(--charcoal)',
                                    }}>
                                        {item.category}
                                    </div>
                                    <div style={{
                                        position: 'absolute', top: '12px', right: '12px',
                                        background: item.type === 'For Sale' ? '#1C2B3A' : '#2C3E2D',
                                        borderRadius: '6px', padding: '4px 10px',
                                        fontSize: '11px', fontWeight: 500, color: 'white',
                                    }}>
                                        {item.type}
                                    </div>
                                </div>

                                <div style={{ padding: '20px' }}>
                                    <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '20px', fontWeight: 400, color: 'var(--charcoal)', marginBottom: '6px' }}>
                                        {item.title}
                                    </h3>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--warm-grey)', fontSize: '13px', marginBottom: '16px' }}>
                                        <span className="material-icons-round" style={{ fontSize: '14px' }}>location_on</span>
                                        {item.location}
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '22px', fontWeight: 600, color: 'var(--charcoal)' }}>{item.price}</span>
                                        <button style={{
                                            background: 'var(--cream)', border: '1px solid rgba(28,28,26,0.1)',
                                            borderRadius: '8px', padding: '8px 16px', fontSize: '13px',
                                            fontWeight: 500, cursor: 'pointer', color: 'var(--charcoal)',
                                            fontFamily: "'DM Sans', sans-serif",
                                        }}>
                                            View
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── CTA ── */}
                <section id="about" style={{ padding: '0 2rem 80px', maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{
                        background: 'var(--charcoal)', borderRadius: '24px',
                        padding: '64px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center',
                        position: 'relative', overflow: 'hidden',
                    }}>
                        <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: '300px', height: '300px', borderRadius: '50%', background: 'rgba(184,115,51,0.15)' }} />
                        <div style={{ position: 'absolute', bottom: '-60px', left: '40%', width: '200px', height: '200px', borderRadius: '50%', background: 'rgba(184,115,51,0.08)' }} />

                        <div style={{ position: 'relative' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                                <div style={{ height: '1px', width: '32px', background: 'var(--bronze)' }} />
                                <span style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--bronze)' }}>Sell With Us</span>
                            </div>
                            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '48px', fontWeight: 300, color: 'white', lineHeight: 1.1, marginBottom: '20px' }}>
                                List Your Property <em style={{ fontStyle: 'italic', color: 'var(--bronze-light)' }}>Today</em>
                            </h2>
                            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, maxWidth: '380px', fontWeight: 300 }}>
                                Reach thousands of verified buyers across Kenya. Create your free listing in under 5 minutes.
                            </p>
                        </div>

                        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {[
                                { icon: 'check_circle', text: 'Free to list — no hidden fees' },
                                { icon: 'check_circle', text: 'Reach verified buyers instantly' },
                                { icon: 'check_circle', text: 'Manage all listings from dashboard' },
                                { icon: 'check_circle', text: 'WhatsApp enquiries directly to you' },
                            ].map(item => (
                                <div key={item.text} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <span className="material-icons-round" style={{ color: 'var(--bronze)', fontSize: '20px' }}>{item.icon}</span>
                                    <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '15px' }}>{item.text}</span>
                                </div>
                            ))}

                            <div style={{ marginTop: '16px' }}>
                                {auth.user ? (
                                    <Link href="/listings/create" style={{
                                        background: 'var(--bronze)', color: 'white',
                                        padding: '14px 32px', borderRadius: '10px',
                                        textDecoration: 'none', fontSize: '15px', fontWeight: 500,
                                        display: 'inline-flex', alignItems: 'center', gap: '8px',
                                    }} className="btn-primary">
                                        <span className="material-icons-round" style={{ fontSize: '18px' }}>add</span>
                                        Create a Listing
                                    </Link>
                                ) : (
                                    <Link href={register()} style={{
                                        background: 'var(--bronze)', color: 'white',
                                        padding: '14px 32px', borderRadius: '10px',
                                        textDecoration: 'none', fontSize: '15px', fontWeight: 500,
                                        display: 'inline-flex', alignItems: 'center', gap: '8px',
                                    }} className="btn-primary">
                                        <span className="material-icons-round" style={{ fontSize: '18px' }}>arrow_forward</span>
                                        Start for Free
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── FOOTER ── */}
                <footer style={{
                    borderTop: '1px solid rgba(28,28,26,0.08)',
                    padding: '40px 2rem',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    maxWidth: '1200px', margin: '0 auto',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: '28px', height: '28px', background: 'var(--bronze)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <span className="material-icons-round" style={{ color: 'white', fontSize: '14px' }}>home_work</span>
                        </div>
                        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '18px', fontWeight: 600 }}>RainView Properties</span>
                    </div>
                    <span style={{ fontSize: '13px', color: 'var(--warm-grey)' }}>© 2026 RainView Properties. All rights reserved.</span>
                    <div style={{ display: 'flex', gap: '24px' }}>
                        {['Privacy', 'Terms', 'Contact'].map(l => (
                            <a key={l} href="#" className="nav-link" style={{ fontSize: '13px', color: 'var(--warm-grey)', textDecoration: 'none' }}>{l}</a>
                        ))}
                    </div>
                </footer>
            </div>
        </>
    );
}
