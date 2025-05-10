export const getOrderStatusColor = (status: string) => {
	switch (status) {
		case 'Pending': return 'secondary';
		case 'Succeeded': return 'default';
		case 'Cancelled': return 'destructive';
	}
}