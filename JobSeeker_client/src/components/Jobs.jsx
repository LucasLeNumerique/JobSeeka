import { useEffect, useState } from "react";
import { Link } from "react-router"
import { formatSalary, formatDate } from "../utils/formatters"

const Jobs = ({ setSelectedJob }) => {
    const [jobs, setJobs] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch('https://localhost:7103/api/jobs')
        .then(response => response.json())
        .then(data => {
            setJobs(data)
            setLoading(false)
        })
        .catch(error => {
            console.error("Erreur de chargement", error)
            setLoading(false)
        })
    }, [])

    if (loading) {
        return (
            <div className="relative w-full h-full">
                <p className="absolute top-1/2 -translate-y-1/2 text-center italic text-2xl font-medium">Les opportunités sont en train de charger...</p>
            </div>
        )
    }

    const handleJobClick = (job) => {
        setSelectedJob(job)
    }

    return (
        <div className="lg:overflow-y-auto lg:p-4 flex flex-col gap-y-4 rounded-xl">
            {jobs.length === 0 ? (
                <p className="absolute top-1/2 -translate-y-1/2 text-center italic">Il n'y a actuellement pas d'offre à découvrir.</p>
            ) : (
                jobs.map(job => (
                    <article 
                        key={job.id} 
                        onClick={() => handleJobClick(job)}
                        className="relative cursor-pointer p-2 lg:p-4 flex flex-col gap-2 border border-gray-600 hover:border-cyan-400 shadow-xl hover:shadow-cyan-600/50 rounded-xl"
                    >
                        <Link 
                            to={`/jobs/${job.id}`}
                            className="hidden sm:block absolute pt-3 lg:pt-5 top-0 right-3 lg:right-5"
                        >
                            <div className="px-3 h-8 flex justify-center items-center gap-x-1 text-white bg-blue-500 transition hover:bg-cyan-400 rounded-full shadow-md shadow-blue-900 hover:shadow-cyan-600">
                                <p className="font-medium">Détails</p>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 0 1 .67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 1 1-.671-1.34l.041-.022ZM12 9a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
                                </svg>
                            </div>
                        </Link>
                        <h3 className="w-full sm:max-w-2/3">{job.title}</h3>
                        <p className="italic font-bold">{job.company}</p>
                        {job.salary ? <p className="text-base">Salaire annuel : {formatSalary(job.salary)} €</p> : <p>Salaire non défini</p>}
                        <p>Publiée le {formatDate(job.postedDate)}</p>
                        <Link 
                            to={`/jobs/${job.id}`}
                            className="sm:hidden pt-3 lg:pt-5"
                        >
                            <div className="px-3 h-10 flex justify-center items-center gap-x-1 text-white border border-cyan-400 bg-linear-to-r from-white to-cyan-50 rounded-lg">
                                <p className="block font-medium text-cyan-400 bg-linear-to-r from-white to-cyan-50">Détails</p>
                            </div>
                        </Link>
                    </article>
                ))
            )}
        </div>
    )
}

export default Jobs