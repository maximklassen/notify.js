export type NotifyPosition = 'left' | 'right' | 'center';
export type NotifyType = 'error' | 'warning' | 'success' | 'info';

export interface CloseOptions {
    auto: boolean;
    time: number;
    delay?: number;
}

export type CloseInput = boolean | string | number | Partial<CloseOptions>;

export interface NotifyOptions {
    position?: NotifyPosition;
    close?: CloseInput;
}

export interface ResolvedNotifyOptions {
    position: NotifyPosition;
    close: Required<CloseOptions>;
}

export interface NotificationItemOptions {
    text?: string;
    title?: string;
    type?: NotifyType;
}

export interface NotifyElement extends HTMLDivElement {
    close: () => void;
}

export class Notify {
    private options: ResolvedNotifyOptions;
    private box: HTMLElement;
    private notifies: NotifyElement[] = [];

    constructor(options: NotifyOptions = {}) {
        this.options = this.resolveOptions(options);
        this.box = this.getOrCreateBox(this.options.position);
    }

    private resolveOptions(options: NotifyOptions): ResolvedNotifyOptions {
        const position: NotifyPosition = ['left', 'right', 'center'].includes(options.position as NotifyPosition)
            ? (options.position as NotifyPosition)
            : 'center';

        return {
            position,
            close: this.normalizeCloseOptions(options.close)
        };
    }

    private normalizeCloseOptions(closeInput?: unknown): Required<CloseOptions> {
        let auto = false;
        let time = 500;
        let delay = 5000;

        if (typeof closeInput === 'boolean') {
            auto = closeInput;
        } else if (typeof closeInput === 'string') {
            time = parseInt(closeInput, 10) || 500;
        } else if (typeof closeInput === 'number') {
            time = closeInput;
        } else if (typeof closeInput === 'object' && closeInput !== null) {
            const opts = closeInput as Partial<CloseOptions>;
            auto = opts.auto ?? false;
            time = opts.time ?? 500;
            delay = opts.delay ?? 5000;
        }

        if (time < 10) {
            time *= 1000;
        } else if (time < 100) {
            time = 500;
        }

        if (auto) {
            if (delay < 100) delay *= 1000;
            if (delay < 3000) delay = 5000;
        }

        return { auto, time, delay };
    }

    private getOrCreateBox(position: NotifyPosition): HTMLElement {
        let box = document.querySelector<HTMLElement>('.notify-box');

        if (!box) {
            box = document.createElement('div');
            box.classList.add('notify-box');
            document.body.append(box);
        }

        if (position !== 'center') {
            box.classList.add(`notify-${position}-box`);
        }

        return box;
    }

    public new(params: string | NotificationItemOptions): NotifyElement | null {
        const options: NotificationItemOptions = typeof params === 'string'
            ? { text: params }
            : params;

        if (!options || (!options.text && !options.title)) {
            return null;
        }

        const validTypes: NotifyType[] = ['error', 'warning', 'success', 'info'];
        const type: NotifyType = validTypes.includes(options.type as NotifyType)
            ? (options.type as NotifyType)
            : 'info';

        const notify = document.createElement('div') as NotifyElement;
        notify.classList.add('notify', `notify-${type}`, 'closed');
        notify.style.setProperty('--close-time', `${this.options.close.time}ms`);

        const notifyData = document.createElement('div');
        notifyData.classList.add('notify-data');

        const notifyIcon = document.createElement('div');
        notifyIcon.classList.add('notify-icon');

        const notifyContent = document.createElement('div');
        notifyContent.classList.add('notify-content');

        const notifyClose = document.createElement('div');
        notifyClose.classList.add('notify-close');
        notifyClose.textContent = '×';
        notifyClose.addEventListener('click', () => this.close(notify));

        if (options.title) {
            const notifyTitle = document.createElement('div');
            notifyTitle.classList.add('notify-title');
            notifyTitle.textContent = options.title;
            notifyContent.append(notifyTitle);
        }

        if (options.text) {
            const notifyText = document.createElement('div');
            notifyText.classList.add('notify-text');
            notifyText.textContent = options.text;
            notifyContent.append(notifyText);
        }

        notifyData.append(notifyIcon, notifyContent, notifyClose);
        notify.append(notifyData);

        this.box.prepend(notify);

        requestAnimationFrame(() => {
            setTimeout(() => notify.classList.remove('closed'), 10);
        });

        if (this.options.close.auto) {
            setTimeout(() => this.close(notify), this.options.close.delay);
        }

        notify.close = () => this.close(notify);
        this.notifies.push(notify);

        return notify;
    }

    public close(notify: NotifyElement): void {
        if (!notify || !notify.parentNode) return;

        notify.classList.add('closed');
        setTimeout(() => {
            notify.remove();
            this.notifies = this.notifies.filter((item) => item !== notify);
        }, this.options.close.time);
    }
}
