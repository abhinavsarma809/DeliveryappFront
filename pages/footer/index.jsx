import './index.css';

const Footer = () => {
	return (
		<>
			<div className="footer page">
				<div className="footer__content">
					<div className="footer__content__logo">
						<div className="footer__content__logo__icon"></div>
						<div className="footer__content__logo__store"></div>
						<p>
							Company # 490039-445, Registered with
							<br /> House of companies
						</p>
					</div>

					<div className="footer__content__last">
						<div className="footer__content__form">
							<h4>Get Exclusive Deals in your Inbox</h4>
							<form className="footer__content__form__input">
								<input type="text" placeholder="yourmail@mail.com" />
								<button>subscribe</button>
							</form>

							<p>we wont spam, read our email policy</p>
							<div className="footer__content__form__input__icon">
								<div></div>
								<div></div>
								<div></div>
								<div></div>
							</div>
						</div>

						<div className="footer__content__links">
							<div>
								<h4>Legal Pages</h4>
								<a>Terms and conditions</a>
								<a>Privacy</a>
								<a>Cookies</a>
								<a>Modern Slavery Statement</a>
							</div>
							<div>
								<h4>Important Links</h4>
								<a>Get help</a>
								<a>Add your resturant</a>
								<a>Sign up to delivery</a>
								<a>Create a business account</a>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="footer__disclaimer page">
				<div className="footer__disclaimer__1">
					<p>Order.uk Copyright 2024, All Rights Reserve</p>
				</div>
				<div className="footer__disclaimer__2">
					<p>Privacy Policy </p>
					<p>Terms</p>
					<p>pricing</p>
					<p> Do not sell or share my personal information</p>
				</div>
			</div>
		</>
	);
};

export default Footer;