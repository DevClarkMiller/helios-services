import React from 'react';

export interface FieldListItemProps {
	colSize?: number;
	title: string;
	children: React.ReactNode;
}

const FieldListItem = ({ colSize = undefined, title, children }: FieldListItemProps) => {
	const colClassName = colSize ? `col-${colSize}` : 'col';

	return (
		<div className={`${colClassName} w-100 p-0 m-0`}>
			<div className="row w-100 p-0 m-0">
				<span className="col-6 fw-semibold p-0">{title}</span>
				<span className="col-6 p-0">{children}</span>
			</div>
		</div>
	);
};

export default FieldListItem;
