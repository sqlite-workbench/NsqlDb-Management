import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import ContextRouter from '../contextAPI/ContextRouter';
import "../CSS/home.css";

export default function Home() {
    const history=useHistory()
    const context=useContext(ContextRouter)
    if(localStorage.getItem("auth") && !localStorage.getItem("dbname")){
        history.replace({pathname:"/dashboard"})
    }
    else if(localStorage.getItem("dbname")){
        history.replace({pathname:"/database"}) 
    }
  return (
      <div className='home-head'>
            {/* Animated Background Elements */}
            <div className='background-decoration'>
                <div className='floating-shape shape-1'></div>
                <div className='floating-shape shape-2'></div>
                <div className='floating-shape shape-3'></div>
                <div className='floating-shape shape-4'></div>
            </div>

            {/* Hero Section */}
            <div className='home-part-1'>
                <div className='home-part-11'>
                    <div className='badge'>
                        <span className='badge-icon'>⚡</span>
                        Cloud-Based Solution
                    </div>
                    <div id='main-heading'>
                        NSQLDB System that provides <span className='highlight'>SQLite Database</span> on Cloud
                    </div>
                    <div id='sub-heading'>
                        Visualize and manage SQLite databases effortlessly with our intuitive cloud platform
                    </div>
                    <div id='start-now-btn'>
                        <button className='btn-primary' onClick={()=>{history.push("/login");context.runLoader(10)}}>
                            <span className='btn-glow'></span>
                            Start Now
                            <span className='btn-arrow'>→</span>
                        </button>
                        <div className='btn-subtitle'>No credit card required</div>
                    </div>
                    <div className='features-quick'>
                        <div className='feature-item'>
                            <div className='feature-icon-box'>⚡</div>
                            <span>Fast & Secure</span>
                        </div>
                        <div className='feature-item'>
                            <div className='feature-icon-box'>☁️</div>
                            <span>Cloud Hosted</span>
                        </div>
                        <div className='feature-item'>
                            <div className='feature-icon-box'>🔒</div>
                            <span>API Access</span>
                        </div>
                    </div>
                </div>
                <div className='home-part-12'>
                    <div className='image-container'>
                        <div className='image-glow'></div>
                        <img src='/mainPage.png' alt='NSQLDB Dashboard'/>
                        <div className='image-overlay-pattern'></div>
                    </div>
                </div>
            </div>
            {/* Features Section */}
            <div className='home-part-2'>
                <div className='section-particles'>
                    <div className='particle'></div>
                    <div className='particle'></div>
                    <div className='particle'></div>
                </div>
                <div className='home-part-21'>
                    <div className='home-part-211'>
                        <div className='section-badge'>
                            <span className='badge-pulse'></span>
                            Features
                        </div>
                        <div className='home-heading'>
                            Why Choose NSQLDB?
                        </div>
                        <div className='home-sub-heading'>
                            <div className='feature-card'>
                                <div className='feature-card-icon'>🎨</div>
                                <div className='feature-card-content'>
                                    <h3>Visual Interface</h3>
                                    <p>Interact with SQLite databases through an intuitive visual interface that makes database management simple and efficient.</p>
                                </div>
                            </div>
                            <div className='feature-card'>
                                <div className='feature-card-icon'>☁️</div>
                                <div className='feature-card-content'>
                                    <h3>Cloud Deployment</h3>
                                    <p>Deploy your database on our secure cloud servers with automatic scaling, backups, and high availability.</p>
                                </div>
                            </div>
                            <div className='feature-card'>
                                <div className='feature-card-icon'>🔑</div>
                                <div className='feature-card-content'>
                                    <h3>API Access</h3>
                                    <p>Access your database from any application using our RESTful API with secure access keys.</p>
                                </div>
                            </div>
                            <div className='feature-card'>
                                <div className='feature-card-icon'>⚙️</div>
                                <div className='feature-card-content'>
                                    <h3>Database Management</h3>
                                    <p>Easily manage and migrate your existing SQLite databases with powerful tools and features.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className='home-part-21'>
                    <div className='home-part-212'>
                        <div className='section-badge'>
                            <span className='badge-pulse'></span>
                            Process
                        </div>
                        <div className='home-heading'>
                            How Does It Work?
                        </div>
                        <div className='home-sub-heading'>
                            <div className='steps-container'>
                                <div className='step-card'>
                                    <div className='step-number'>1</div>
                                    <div className='step-content'>
                                        <h3>Sign Up</h3>
                                        <p>Create your account and get started in seconds with our simple registration process.</p>
                                    </div>
                                </div>
                                <div className='step-card'>
                                    <div className='step-number'>2</div>
                                    <div className='step-content'>
                                        <h3>Get API Key</h3>
                                        <p>Receive your unique API key to create and manage multiple databases securely.</p>
                                    </div>
                                </div>
                                <div className='step-card'>
                                    <div className='step-number'>3</div>
                                    <div className='step-content'>
                                        <h3>Access Anywhere</h3>
                                        <p>Use the API key to access your databases from any application, backend or frontend.</p>
                                    </div>
                                </div>
                                <div className='step-card'>
                                    <div className='step-number'>4</div>
                                    <div className='step-content'>
                                        <h3>Start Building</h3>
                                        <p>Check our documentation for detailed guides and start building amazing applications.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Testimonial Section */}
            <div className='home-part-3'>
                <div className='testimonial-decoration'>
                    <div className='deco-circle circle-1'></div>
                    <div className='deco-circle circle-2'></div>
                </div>
                <div className='home-part-31'>
                    <div className='quote-icon'>"</div>
                    <div className='stars-rating'>
                        <span className='star'>⭐</span>
                        <span className='star'>⭐</span>
                        <span className='star'>⭐</span>
                        <span className='star'>⭐</span>
                        <span className='star'>⭐</span>
                    </div>
                    <div className='msg-founder'>
                        We needed to provide our clients with a platform that is as reliable as we are. NSQLDB delivers a powerful visual interface for SQLite database management.
                    </div>
                    <div className='founder-info'>
                        <div className='founder-avatar'>
                            <span>👨‍💼</span>
                        </div>
                        <div className='founder-name'>Nitin Gupta</div>
                        <div className='founder-position'>Founder & CEO</div>
                    </div>
                </div>
            </div>
            {/* CTA Section */}
            <div className='home-part-4'>
                <div className='cta-background-pattern'></div>
                <div className='cta-content'>
                    <div className='home-part-41'>
                        Ready To
                    </div>
                    <div className='home-part-42'>
                        Start Building?
                    </div>
                    <div className='home-part-43'>
                        Deploy a free database now and experience the power of cloud-based SQLite
                    </div>
                    <div className='home-btns'>
                        <button className='btn-cta-primary' onClick={()=>{history.push("/login");context.runLoader(10)}}>
                            <span className='btn-glow'></span>
                            Try Now Free
                            <span className='btn-arrow'>→</span>
                        </button>
                        <button className='btn-cta-secondary' onClick={()=>{history.push("/documentation")}}>
                            <span className='btn-icon'>📚</span>
                            View Documentation
                        </button>
                    </div>
                    <div className='stats-row'>
                        <div className='stat-item'>
                            <div className='stat-icon'>👥</div>
                            <div className='stat-number'>1000+</div>
                            <div className='stat-label'>Active Users</div>
                        </div>
                        <div className='stat-item'>
                            <div className='stat-icon'>💾</div>
                            <div className='stat-number'>5000+</div>
                            <div className='stat-label'>Databases Hosted</div>
                        </div>
                        <div className='stat-item'>
                            <div className='stat-icon'>⚡</div>
                            <div className='stat-number'>99.9%</div>
                            <div className='stat-label'>Uptime</div>
                        </div>
                    </div>
                </div>
                <div className='copyright'>
                    <span>&#169; {new Date().getFullYear()} NSQLDB</span>
                    <span className='copyright-divider'>|</span>
                    <span>All Rights Reserved</span>
                    <span className='copyright-divider'>|</span>
                    <span className='social-icons'>
                        <span className='social-icon'>💼</span>
                        <span className='social-icon'>🐦</span>
                        <span className='social-icon'>📧</span>
                    </span>
                </div>
            </div>
      </div>
  )
}
