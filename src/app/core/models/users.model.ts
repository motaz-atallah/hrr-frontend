export interface User {
    username: string;
    password: string;
    isAdmin: boolean;
}

export const users: User[] = [
    { username: 'Admin', password: 'admin', isAdmin: true },
    { username: 'Motaz', password: '1234', isAdmin: false },
    { username: 'Ahmad', password: '1234', isAdmin: false }
];
