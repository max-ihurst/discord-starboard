import Listener from '../Listener';
import * as mongoose from 'mongoose';

export default class ReadyListener implements Listener {
    public name = 'ready';
    public once = true;

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	public constructor() {}

	public async execute(): Promise<void> {
		await mongoose.connect(process.env.MONGO_URI!);
        console.log('Yoo this is ready!');
	}
}