export default function ContactMap() {
  return (
    <section className="h-[400px] w-full bg-gray-200 relative">
      {/* In a real implementation, this would be an actual map integration */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <h3 className="text-xl font-bold mb-2">Our Location</h3>
          <p className="text-gray-600">123 Solar Street, Kolkata, West Bengal, India - 700001</p>
          <p className="mt-4 text-sm text-gray-500">
            (Map integration would be implemented here with Google Maps or similar service)
          </p>
        </div>
      </div>
    </section>
  )
}

