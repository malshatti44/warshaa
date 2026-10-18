//! Give memory the system allocator keeps after frees back to the system
//! ([`tayf_engine::memory::set_release_hook`]). The platform call lives in
//! `tayf-sysmem`, the workspace's only crate allowed `unsafe`.

/// Install the hook.
pub fn install() {
    tayf_engine::memory::set_release_hook(release);
}

fn release() {
    let _ = tayf_sysmem::release_free_memory();
}
