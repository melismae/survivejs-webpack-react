//Flux data flow unidirectional Action->Dispatcher->Store->View
//Action gets triggered, dispatcher notified, deals with the action, stores listening are triggered, internal state updated
import Alt from 'alt';
//import chromeDebug from 'alt-utils/lib/chromeDebug';

const alt = new Alt();
//chromeDebug(alt);

export default alt;
