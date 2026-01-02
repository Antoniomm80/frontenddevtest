export const DetailRow = ({label, value}) => {
    if (!value) return null;
    return (
        <div className="flex justify-between py-2 border-b">
            <span className="font-semibold text-gray-700">{label}:</span>
            <span className="text-gray-600">{value}</span>
        </div>
    );
};