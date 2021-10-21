import {
	IonButton,
	IonCard,
	IonCardContent,
	IonCardHeader,
	IonContent,
	IonHeader,
	IonPage,
	IonTitle,
	IonToolbar,
} from "@ionic/react";
import { useState } from "react";
import "./Home.css";

import { Plugins } from "@capacitor/core";
import "cap-read-sms";
const { ReadSMS } = Plugins;

const Home: React.FC = () => {
	const [msg, setMsg] = useState<any>([]);
	const [permStatus, setPermStatus] = useState("");
	const readSMS = async () => {
		const sms = (await ReadSMS.getSMS()).value;
		setMsg((val: any) => [...val, ...sms]);
		console.log(sms, "value of SMS");
	};

	const requestPermission = async () => {
		const permission = (await ReadSMS.requestPermission()).value;
		setPermStatus(permission);
		console.log(permission, "permission");
	};

	const checkPermission = async () => {
		const permission = (await ReadSMS.checkPermission()).value;
		setPermStatus(permission);
		console.log(permission, "checkPermission");
	};
	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Read SMS Example</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
				<IonHeader collapse="condense">
					<IonToolbar>
						<IonTitle size="large">Read SMS Example</IonTitle>
					</IonToolbar>
				</IonHeader>
				<IonButton onClick={() => readSMS()}>Read SMS</IonButton>
				<IonButton onClick={() => requestPermission()}>
					Requst SMS Permission
				</IonButton>
				<IonButton onClick={() => checkPermission()}>
					Check current status of SMS Permission
				</IonButton>
				<div>
					{permStatus && <p>Permission: {permStatus}</p>}
					{msg.map((m: any) => (
						<IonCard>
							<IonCardHeader>{m.address}</IonCardHeader>
							<IonCardContent>{m.body}</IonCardContent>
						</IonCard>
					))}
				</div>
			</IonContent>
		</IonPage>
	);
};

export default Home;
