type Alert = {
  id: string;
  title: string;
  location: string;
  time: string;
};

type Listener = () => void;

let alerts: Alert[] = [
  { id: "1", title: "Suspicious person near bike storage", location: "Riverside Court", time: "3m ago" },
  { id: "2", title: "Noise complaint — loud music", location: "42 River Street", time: "18m ago" },
  { id: "3", title: "Fly-tipping behind bins", location: "Meadow Lane", time: "1h ago" },
];

const listeners: Set<Listener> = new Set();

export function getAlerts(): Alert[] {
  return alerts;
}

export function addAlert(title: string, location: string): void {
  alerts = [
    { id: Date.now().toString(), title, location, time: "Just now" },
    ...alerts,
  ];
  listeners.forEach((fn) => fn());
}

export function subscribe(fn: Listener): () => void {
  listeners.add(fn);
  return () => listeners.delete(fn);
}
