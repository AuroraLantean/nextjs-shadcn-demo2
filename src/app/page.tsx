import Image from "next/image";
import homeImg from "@public/home.jpg";

export default function HomePage() {
	return (
		<div>
			Home Page
			<div className="absolute -z-10 inset-0">
				<Image
					alt="home page"
					src={homeImg}
					fill
					style={{ objectFit: "cover" }}
				/>
			</div>
		</div>
	);
}
