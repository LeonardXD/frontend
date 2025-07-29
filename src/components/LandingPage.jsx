import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTitle } from '../hooks/useTitle';

// --- Constants for Text Content ---
const navLinks = [
  { name: 'How It Works', href: '#how-it-works' },
  { name: 'Tasks', href: '#tasks' },
  { name: 'Rewards', href: '#rewards' },
  { name: 'FAQ', href: '#faq' },
];

const heroContent = {
  heading: 'Earn Coins by Doing Simple Tasks',
  description: 'Solve equations, captchas, and number encoding tasks to earn real money. It\'s free and easy!',
  cta: 'Get Started',
};

const howItWorksSteps = [
  {
    icon: 'M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z',
    title: 'Sign Up for an Account',
    description: 'Create an account in seconds and get instant access to our task platform.',
  },
  {
    icon: 'M4 6h16M4 10h16M4 14h16M4 18h16',
    title: 'Complete Tasks',
    description: 'Choose from a wide variety of tasks, including solving equations, number encoding, and more.',
  },
  {
    icon: 'M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z',
    title: 'Get Paid',
    description: 'Redeem your coins for real money via GCash, Paymaya, or other rewards.',
  },
];

const features = [
  {
    icon: 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2z',
    title: 'Multiple Task Categories',
    description: 'From solving equations to memory game, find tasks that fit your interests.',
  },
  {
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
    title: 'Fast Payouts',
    description: 'Receive your earnings quickly and securely through our trusted payment methods.',
  },
  {
    icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21v-1a6 6 0 00-5.197-5.986',
    title: 'Referral Bonuses',
    description: 'Invite your friends and earn ₱20 for each successful referral — plus, your friend gets ₱5 too!',
  },
  {
    icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
    title: 'Secure Platform',
    description: 'Your data and earnings are protected with industry-standard security measures.',
  },
];

const ctaContent = {
  heading: 'Start Earning Today!',
  cta: 'Get Started',
};

// --- Reusable Components ---
const Section = ({ children, className = '' }) => (
  <section className={`py-12 md:py-20 ${className}`}>{children}</section>
);

const Container = ({ children, className = '' }) => (
  <div className={`container mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
);

const Icon = ({ path, className = 'w-12 h-12' }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={path} />
  </svg>
);

// --- Main Landing Page Component ---
const LandingPage = () => {
  useTitle('DemoTasker | Earn Seamlessly');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="bg-white text-gray-800">
      <main>
        {/* Hero Section */}
        <Section className="bg-gray-50 text-center">
          <Container>
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900">{heroContent.heading}</h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">{heroContent.description}</p>
            <Link to="/signup" className="mt-8 inline-block px-8 py-3 text-lg font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
              {heroContent.cta}
            </Link>
          </Container>
        </Section>

        {/* How It Works Section */}
        <Section id="how-it-works">
          <Container className="text-center">
            <h2 className="text-3xl font-bold">How It Works</h2>
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              {howItWorksSteps.map((step) => (
                <div key={step.title} className="flex flex-col items-center">
                  <div className="flex items-center justify-center h-16 w-16 bg-blue-100 text-blue-600 rounded-full">
                    <Icon path={step.icon} />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold">{step.title}</h3>
                  <p className="mt-2 text-gray-600">{step.description}</p>
                </div>
              ))}
            </div>
          </Container>
        </Section>

        {/* Features Section */}
        <Section id="tasks" className="bg-gray-50">
          <Container>
            <h2 className="text-3xl font-bold text-center">Why Choose DemoTasker?</h2>
            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {features.map((feature) => (
                <div key={feature.title} className="p-6 bg-white rounded-lg shadow-md">
                  <div className="text-blue-600">
                    <Icon path={feature.icon} />
                  </div>
                  <h3 className="mt-4 text-xl font-semibold">{feature.title}</h3>
                  <p className="mt-2 text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </Container>
        </Section>

        {/* Call-to-Action Section */}
        <Section id="faq" className="bg-blue-600 text-white">
          <Container className="text-center">
            <h2 className="text-3xl font-bold">{ctaContent.heading}</h2>
            <Link to="/signup" className="mt-6 inline-block px-8 py-3 text-lg font-medium text-blue-600 bg-white rounded-lg hover:bg-gray-100">
              {ctaContent.cta}
            </Link>
          </Container>
        </Section>
      </main>
    </div>
  );
};

export default LandingPage;
