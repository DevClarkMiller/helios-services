import type React from 'react';

export interface IntegratedAccountCardProvider {
	id: number;
	name: string;
	icon: React.ReactNode;
	hasOptions: boolean;
}
